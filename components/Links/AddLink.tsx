import React, { useState, useEffect, useRef } from 'react';
import { Switch } from '@headlessui/react';
import { useOvermind } from 'stores/Overmind';
import {
  ImageUploadElement,
  photoUpload,
} from 'components/utility/ImgUploadElement';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function AddLink({ descr, setDescr, img, setImg, imageUpload }:any) {

const { state: ostate, actions } = useOvermind();

  return (
          <><div className="mt-2 flex flex-col space-y-2 justify-between w-full">
          <label
              htmlFor="name"
              className="caption-small tracking-wider text-base-content"
          >
              Description
          </label>
          <input
              type="text"
              id="title"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              className="input input-bordered input-primary w-full" />
        </div>
         <div className="mt-2 flex flex-col justify-evenly w-full rounded-full">
              <div className="flex">
                  <label
                      htmlFor="name"
                      className=" caption-small tracking-wider text-base-content my-2"
                  >
                      Link Photo
                  </label>
              </div>
              <div className="flex w-full">
                  <ImageUploadElement
                      imgP={img}
                      setImgP={setImg}
                      imageUpload={imageUpload} />
              </div>
          </div></>
  );
}
