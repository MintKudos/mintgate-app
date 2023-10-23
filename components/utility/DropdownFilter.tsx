import React, { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function DropdownFilter({
  filterList,
  filterOption,
  setFilterOption,
  defaultOption,
  filterTitle,
  handleSubmit,
}: {
  filterList;
  filterOption;
  setFilterOption;
  defaultOption?;
  filterTitle?;
  handleSubmit?;
}) {
  const submitValue = (e) => {
    filterOption = e.target.value;
    handleSubmit(filterOption);
  };

  return (
    <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
      {filterTitle && (
        <div className="flex mt-1">
          <label htmlFor={filterTitle} className="block text-xs font-bold">
            {filterTitle}
          </label>
        </div>
      )}
      <div className="flex">
        <select
          onChange={(e) =>
            handleSubmit ? submitValue(e) : setFilterOption(e.target.value)
          }
          className="-mb-2 block w-full pl-3 py-1 pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 sm:text-sm rounded-md shadow-xl"
          defaultValue={defaultOption}
        >
          {filterList &&
            filterList.map((filter) => (
              <option
                key={filter.name}
                value={filter.value}
                className="py-2 px-2 text-center text-gray-600"
              >
                {filter.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
