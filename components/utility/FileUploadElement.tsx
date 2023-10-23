import { ArrowUpOnSquareIcon } from '@heroicons/react/24/solid';
import Input from 'mintflow/Input';
import { useState, useEffect, useRef } from 'react';
import { useAsync } from 'react-use';
import { useEffects } from 'stores/Overmind';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export async function fileUpload(file, type) {
  // ===== image
  // let file = file; //this.uploadInput.files[0];
  let fileParts = file.name.split('.');
  // let fileName = fileParts.slice(0, -1);
  let fileType = fileParts[fileParts.length - 1];
  let contentType = file.type;
  console.log('Preparing the upload', fileType);

  console.log('signing');
  const imgURL = await fetch(`${TPP}/api/sign_s3`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fileName: '',
      fileType: fileType,
      contentType,
      type: type || 'nft',
    }),
  }).then(async (_response) => {
    console.log('signed');
    const response = await _response.json();
    console.log('json parsed', response?.success);
    if (!response?.success) throw new Error('no image upload key');
    // console.log(response.data)
    var returnData = response?.data.returnData;
    var signedRequest = returnData.signedRequest;
    var publicURL = returnData.publicURL;
    // this.setState({ url: url })

    // console.log('url', url);
    console.log('Received a signed request ' + signedRequest);

    return await fetch(signedRequest, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: file,
    })
      .then((result) => {
        console.log('Response from s3', result);
        // throw new Error('')
        // return;
        // this.setState({ success: true });
        return publicURL;
      })
      .catch((error) => {
        alert('ERROR ' + JSON.stringify(error));
        return null;
      });
  });

  return imgURL;
}

export function FileUploadElement({ onUpload, type }) {
  const [updatedUrl, setUrl] = useState<string>();
  type = type || 'img';
  let accept = 'image/png, image/jpeg, image/gif, image/webp'; // 'image/*';
  let fileTypes = 'jpg, png or gif';

  if (type === 'pdf') type = 'ebk';
  if (type === 'pdf' || type === 'ebk') {
    accept = 'application/pdf';
    fileTypes = 'pdf';
  }

  const refInput = useRef<any>();
  const [file, setFile] = useState(null); // -1 = error, 1 = loaded

  const uploadProgress = useAsync(async () => {
    if (!file) return false;
    console.log('loading', file);
    const url = await fileUpload(file, type);
    console.log('uploaded', url);
    if (url) onUpload(url);
    if (url) setUrl(url);
    return true;
  }, [file]);

  const uploaded =
    file && uploadProgress.value === true && !uploadProgress.loading;

  return (
    <div className="cursor-pointer">
      <div>
        {' '}
        {uploaded && type == 'ebk' && (
          <p className={`base1 mb-4`}>
            {/* arrow-up-tray */}
            {`Uploaded filename "${file?.name}" successfully. Click on `}
            <a href={updatedUrl} target="_blank" className="link">
              this link{' '}
              <ArrowUpOnSquareIcon
                width={24}
                className="w-4 h-4 inline-block"
              />
            </a>
            to preview
          </p>
        )}
        {uploaded && type == 'img' && (
          <p className={`base1 mb-4`}>
            {/* {`Uploaded ${file?.name} successfully.`} */}
            <img src={updatedUrl} className="link" />
          </p>
        )}
      </div>
      <div
        className={`border-dashed border-2 border-base-300 ${
          !uploaded ? 'h-40' : 'h-auto'
        } p-4 w-full relative rounded-2xl bg-base-200 hover:border-primary focus:border-primary flex justify-center items-center cursor-pointer`}
      >
        <div className="absolute pointer-events-none">
          <div className="h-full w-full text-center flex justify-center items-center flex-col">
            {file && uploadProgress.loading ? null : (
              <>
                {(!uploaded && type == 'pdf') ||
                  (!uploaded && type == 'img' && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-base-content opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </>
                  ))}
                <div className={`${uploaded ? 'hidden' : 'block'}`}>
                  <p className="body2  mt-2">Drop or click here</p>{' '}
                  <p className="body2">to upload a {fileTypes}</p>
                </div>{' '}
              </>
            )}
            {file && uploadProgress.loading && (
              <p className={`block body2 text-base-content cursor-pointer`}>
                uploading {file.name}...
              </p>
            )}
            {(uploaded && type == 'pdf') ||
              (uploaded && type == 'img' && (
                <p className={`block body2 coursor-pointer text-base-content`}>
                  Change the file
                </p>
              ))}
          </div>
        </div>
        <input
          className="h-full w-full opacity-0"
          type="file"
          ref={refInput}
          accept={accept}
          onChange={() => {
            var reader = new FileReader();
            reader.onload = function () {
              console.log(
                'refInput.current.files[0]',
                refInput.current.files[0]
              );
              setFile(refInput.current.files[0]);
            };
            if (refInput.current.files[0])
              reader.readAsDataURL(refInput.current.files[0]);
          }}
        />
      </div>
    </div>
  );
}
