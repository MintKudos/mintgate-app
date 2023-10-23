import React from 'react';
import { useAsync } from 'react-use';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import DropdownFilter from '../utility/DropdownFilter';
import DownloadButton from '../utility/DownloadButton';
import { useOvermind } from 'stores/Overmind';

export default function standardData({
  titleName,
  data,
  photoUrl,
  photoDescription,
  filterExists,
  filterOption,
  filterList,
  setFilterOption,
  downloadExists,
  downloadData,
  fileName,
  mainColor,
  secondaryColor,
}) {
  const { state: ostate, actions } = useOvermind();

  //console.log('FilterList', filterList);

  mainColor = mainColor || 'bg-violet-200';
  secondaryColor = secondaryColor || 'bg-violet-100';

  //console.log('photoUrl', photoUrl);

  //console.log('downloadData in Standard data', downloadData);

  return (
    <div className="mt-5">
      <div
        id={titleName}
        className={`relative pt-5 px-8 pb-4 sm:pt-6 sm:px-6 shadow-xl rounded-xl overflow-hidden ${mainColor ? mainColor : 'text-base-content'
          }`}
      >
        <div className="flex flex-col space-y-1 rounded-xl my-auto px-4 py-2">
          <div className="flex flex-row align-left space-x-2">
            <div>
              <img
                src={photoUrl}
                alt={photoDescription}
                className="h-12 w-12 shadow-md p-3 bg-white rounded-md"
              ></img>
            </div>
            <div className="mt-1 w-2/3 text-4xl font-medium tracking-wide mb-4">
              {data}
            </div>
          </div>
          <div className="mb-4 flex flex-row space-x-4 mt-2 items-baseline">
            <div className="flex text-xl capitalize font-thin text-gray-900 opacity-80 truncate">
              {titleName}
            </div>
            <div className="flex flex-row space-x-2">
              {filterExists && (
                <div className="flex">
                  <DropdownFilter
                    filterTitle={'Filter'}
                    filterList={filterList}
                    filterOption={filterOption}
                    setFilterOption={setFilterOption}
                  ></DropdownFilter>
                </div>
              )}
              {downloadExists && (
                <div className="flex">
                  <DownloadButton
                    data={downloadData}
                    fileName={fileName}
                  ></DownloadButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
