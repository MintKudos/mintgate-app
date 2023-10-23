import { useState, useEffect } from 'react';
import { VideoUploader } from '@api.video/video-uploader';
import { useEffects, useOvermind } from 'stores/Overmind';
import { useAsync, useInterval } from 'react-use';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export function VideoUpload({ onFile, type }) {
  const { state: ostate, actions } = useOvermind();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [lastEvent, setEvent] = useState(null);
  const [processStatus, setProcessStatus] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [fileName, setFileName] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [iframeSrc, setIframeSrc] = useState(null);

  const onChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    onFile(null);
    setLoading(true);

    setFileName(file.name);

    const token = await fetch(
      `${TPP}/api/video/upload/token?jwt=` + ostate.user.jwt
    )
      .then((res) => res.json())
      .then((r) => r.token);

    if (!token) {
      setLoading(false);
      return;
    }

    const uploader = new VideoUploader({
      file: file,
      uploadToken: token,
      // public: false,
    });
    uploader.onProgress((event) => {
      setCompleted(Math.round((event.uploadedBytes / event.totalBytes) * 100));
      setEvent(event);
    });
    const videoObj = await uploader.upload();

    console.log('videoObj', videoObj);

    if (!videoObj.assets) {
      alert('Upload failed! Please report this on Discord.');
      return;
    }

    setThumb(videoObj.assets.thumbnail);
    setIframeSrc(videoObj.assets.player);

    if (onFile && videoObj) {
      console.log('videoObj.videoId', videoObj.videoId);
      onFile(
        videoObj.videoId,
        videoObj.assets.thumbnail,
        videoObj.assets.player
      );
      setVideoId(videoObj.videoId);
    }
    setLoading(false);
    setCompleted(100);
  };

  useInterval(
    async () => {
      if (!videoId) return;
      const url = new URL(`${TPP}/api/video/getInfo`);
      url.searchParams.set('videoId', videoId);
      url.searchParams.set('type', type);

      const data = await fetch(url.href).then((resp) => resp.json());
      setProcessStatus(data?.results?.encoding?.playable || null);
    },
    processStatus === null && videoId ? 12000 : null
  );

  if (completed >= 100 && iframeSrc) {
    return (
      <div className="mt-4 text-start w-full">
        {type === 'audio' &&
          (processStatus == false || processStatus == null) && (
            <h2 className="base2 text-base-content">Audio still processing.</h2>
          )}
        {type === 'audio' && processStatus == true && (
          <h2 className="base2 text-base-content">
            Audio has successfully processed!
          </h2>
        )}
        {type === 'video' &&
          (processStatus == false || processStatus == null) && (
            <h2 className="base2 text-base-content">
              Video still processing. Video preview will appear shortly.
            </h2>
          )}
        {type === 'video' && processStatus == true && (
          <div>
            <iframe
              src={iframeSrc}
              className="h-full w-full aspect-video rounded-box overflow-hidden"
            ></iframe>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {!loading && (
        <div className="border-dashed border-2 border-base-300 h-44 w-80 aspect-video relative rounded-box bg-base-200 hover:border-primary focus:border-primary flex justify-center items-center transition-all ease-in duration-300">
          <div className="absolute">
            <div className="h-full w-full text-center flex flex-col justify-center items-center">
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
              <div className="mt-2 block text-base-content opacity-60">
                <p className="body2">Drop or click here</p>
                <p className="body2">
                  to upload your{' '}
                  {type == 'video' ? 'video  (mp4 or mov)' : 'audio (mp3)'}
                </p>
              </div>
            </div>
          </div>
          <input
            onChange={onChange}
            className="h-full w-full opacity-0 cursor-pointer"
            type="file"
            placeholder="Image URL"
            accept={type == 'video' ? 'video/*' : '.mp3'}
          />
        </div>
      )}
      {loading && (
        <div>
          <p className="p-1 caption2">
            <span className="font-medium">Uploading video {fileName}</span>
            <br />
            <span className="opacity-60">
              {completed}% (
              {lastEvent && Math.floor(lastEvent.uploadedBytes / 1024)}kb of{' '}
              {lastEvent && Math.ceil(lastEvent.totalBytes / 1024)}kb) complete
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
