import { useState, useEffect, useRef } from 'react';
import Fastly from './Fastly';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export async function photoUpload(imageUpload, type?: string) {
  // ===== image

  if (!imageUpload) return null;
  let file = imageUpload?.current?.files[0]; //this.uploadInput.files[0];
  if (imageUpload?.name) file = file || imageUpload;
  if (!file) return null;
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
  })
    .then((x) => x.json())
    .then(async (response) => {
      console.log('signed');
      console.log('json parsed', response.success);
      if (!response.success) throw new Error('no image upload key');
      // console.log(response.data)
      var returnData = response.data.returnData;
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
        });
    });

  return imgURL;
}

export function ImageUploadElement({
  imgP,
  setImgP,
  imageUpload,
  type,
  profileImage,
  bannerImage,
  label,
  labelalt,
}: any) {
  type = type || 'img';
  let accept = 'image/*';
  let fileTypes = 'jpg, png or gif';

  if (type === 'pdf') {
    accept = 'application/pdf';
    fileTypes = 'pdf';
  } else if (type === 'nft') {
    accept = 'image/*,.mp4';
    fileTypes = 'jpg, png, gif, or mp4';
  }

  //console.log('imgP', imgP, type);

  return (
    <div className="cursor-pointer w-full">
      {label && (
        <label className="label">
          <span className="label-text base1">{label}</span>
        </label>
      )}
      <div>
        {imgP && (type === 'img' || type === 'nft') && (
          <Fastly
            className={`mb-6 ${
              profileImage
                ? 'w-40 h-40 rounded-full object-cover'
                : bannerImage
                ? 'h-40 w-auto rounded-box object-cover'
                : 'h-80 w-full object-contain object-center mx-auto bg-base-200 rounded-box border border-base-300'
            }`}
            src={imgP}
            alt={'newnft'}
          />
        )}
        <input
          type="file"
          className="caption1 w-full text-grey-500
            file:mr-5 file:py-3 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-primary-content
            file:bg-gradient-to-r file:from-primary file:to-secondary
            hover:file:cursor-pointer hover:file:opacity-80"
          placeholder="SVG, PNG, JPG or GIF (MAX. 800x400px)."
          aria-describedby="file_input_help"
          id="file_input"
          ref={imageUpload}
          accept={accept}
          onChange={() => {
            if (setImgP) setImgP(null);
            var reader = new FileReader();
            reader.onload = function () {
              if (setImgP) setImgP(this.result);
            };
            if (imageUpload?.current?.files[0]) {
              // console.log(
              //   'imageUpload.current.files[0].size',
              //   imageUpload.current.files[0].size
              // );
              if (imageUpload?.current?.files[0].size > 56623104) {
                alert('File is too large, but be smaller than 54mb');
                return;
              }
              reader.readAsDataURL(imageUpload?.current?.files[0]);
            }
          }}
        />
      </div>
      {labelalt && (
        <label className="-mt-0.5 label">
          <span className="label-text-alt caption2 opacity-80">{labelalt}</span>
        </label>
      )}
    </div>
  );
}
