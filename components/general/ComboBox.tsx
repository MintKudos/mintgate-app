import { useState } from 'react';
import { useOvermind } from 'stores/Overmind';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function ComboBox({
  selectedOption,
  setSelectedOption,
  comboLabel,
  dataSet,
}) {
  const { state: ostate, actions } = useOvermind();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="flex flex-row mt-4 space-x-4">
      <Combobox as="div" value={selectedOption} onChange={setSelectedOption}>
        <Combobox.Label
          as="h6"
          className="font-heading font-normal caption-small tracking-wider text-base-content my-2"
        >
          {comboLabel}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Button className="w-full">
            <Combobox.Input
              className="w-full rounded-box border border-base-300 bg-base-100 py-2 pl-3 pr-10 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
              // displayValue={(person) => person.name}
            />
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-base-content/40"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-base-300 ring-opacity-5 focus:outline-none sm:text-sm">
            {dataSet &&
              dataSet.map((option) => (
                <Combobox.Option
                  key={option.tid}
                  value={option.tid}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
                      active
                        ? 'bg-primary text-primary-content'
                        : 'text-base-content'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            'ml-3 truncate',
                            selected && 'font-semibold'
                          )}
                        >
                          <b>{option.name}</b>, <i className="">{option.tid}</i>
                        </span>
                      </div>
                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-primary-content' : 'text-primary'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
