import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { useOvermind } from "stores/Overmind";
import { useTable } from "react-table";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function BrandsTable(brandInfo) {
  {
    //console.log("brandInfo", brandInfo);
  }

  const { state: ostate, actions } = useOvermind();

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Brand URL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Configurations
                  </th>
                </tr>
              </thead>
              <tbody>
                {brandInfo &&
                  brandInfo?.brandInfo?.map((brand) => (
                    <tr key={brand[0]} className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content">
                        {brand[2]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content">
                        {brand[3]}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          brand[4] === "true"
                            ? "text-green-800"
                            : "text-red-800"
                        }`}
                      >
                        {brand[3]?.toString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
