import React from 'react';

export default function standardData({ titleName, data }) {
  return (
    <div className="mt-5 w-full">
      <div
        id="ownerCard"
        className="relative bg-violet-200 pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
      >
        <div className="flex flex-row space-x-1">
          <div className="bg-white rounded-lg h-1/2 py-2 px-2 my-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9013fe"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <dt>
              <p className="ml-6 text-xl uppercase tracking-wider font-medium text-gray-500 truncate">
                {titleName}
              </p>
            </dt>
            <dd className="ml-6 mb-4 flex mt-2 items-baseline">
              <p className="text-5xl font-semibold text-base-content">{data}</p>
              <div className="absolute bottom-0 inset-x-0 bg-violet-100 py-4">
                <div className="text-sm ml-10">
                  <a
                    href="#"
                    className="font-medium text-gray-500 hover:text-indigo-500"
                  >
                    {' '}
                    View all<span className="sr-only"> {titleName} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
