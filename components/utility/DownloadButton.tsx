import React, { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { CSVLink, CSVDownload } from 'react-csv';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function DownloadButton({
  data,
  fileName,
  downloadButtonTitle,
}: {
  data;
  fileName;
  downloadButtonTitle?;
}) {
  downloadButtonTitle = downloadButtonTitle || 'Download';
  return (
    <div>
      {data && (
        <CSVLink data={data} filename={fileName}>
          <button
            type="button"
            className="flex flex-row space-x-2 mt-1 text-gray-500 w-full bg-white pl-2 px-3 py-1 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md rounded-md shadow-xl"
          >
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <div className="flex">
              <span>{downloadButtonTitle}</span>
            </div>
          </button>
        </CSVLink>
      )}
    </div>
  );
}
