import React from "react";
import { useOvermind } from "stores/Overmind";

export default function DataCard(stats) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function colorAlert(name) {
    if (name.includes("Non-Verified")) {
      return <div className="absolute bg-red-100 rounded-md p-3"></div>;
    } else if (name.includes("Verified")) {
      return <div className="absolute bg-green-100 rounded-md p-3"></div>;
    } else {
      return <div className="absolute bg-indigo-500 rounded-md p-3"></div>;
    }
  }

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats?.stats?.map((item) => (
          <div
            key={item}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              {colorAlert(item.name)}
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6"></div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
