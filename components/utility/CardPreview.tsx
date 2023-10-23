import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import Fastly, { BIG_NFT_SIZE } from 'components/utility/Fastly';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from 'mintflow/Button';

export default function ImagePreview({ token, link }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setPreviewOpen(true)}
        size="sm"
        circle
      >
        <ArrowsPointingOutIcon className="w-5 h-5 text-base-content" />
      </Button>
      <Dialog
        className="fixed z-50 inset-0 overflow-y-auto"
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      >
        <button
          type="button"
          onClick={() => setPreviewOpen(false)}
          className="absolute top-6 right-6 z-50 text-base-content opacity-70 hover:opacity-100 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center justify-center h-screen md:px-8 lg:px-0">
          <Dialog.Overlay className="fixed inset-0 bg-base-100 backdrop-blur-xl bg-opacity-60 cursor-pointer" />
          <div className="relative flex flex-col items-center justify-center w-auto h-full p-8">
            <figure className="Tilt-inner card-image-padding">
              <Fastly
                width={BIG_NFT_SIZE}
                src={token?.img ? token?.img : '/cardPlaceholder.png'}
                alt={token?.name}
                onError={(e) => {
                  if (
                    e.target.src !== '/cardPlaceholder.png' &&
                    e.target.src !== window.location.href
                  )
                    e.target.src = '/cardPlaceholder.png';
                }}
                loading="lazy"
                className="h-full max-h-80 object-cover rounded-box"
              />
            </figure>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
