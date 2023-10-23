import React, { useState, useEffect } from "react";
import { useOvermind } from "stores/Overmind";
import { CSVLink } from "react-csv";
import Access from "components/analytics/accessGraph";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function Metrics({ link }) {
  const { state: ostate, actions } = useOvermind();
  const [show, setShow] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    async function showMetrics() {
      const url = new URL(`${TPP}/api/v2/links/metrics`);
      url.searchParams.set("id", link?.id);

      const response = await fetch(url.toString(), {
        method: "GET",
      });
      const data = await response.json();

      setMetrics(data);
    }
    if (show && !metrics) showMetrics();
  }, [show]);

  useEffect(() => {
    if (!show) return;
    async function downloadData() {
      const url = new URL(`${TPP}/api/v2/links/walletsbyLink`);
      url.searchParams.set("id", link?.id);
      url.searchParams.set("jwt", ostate?.user?.jwt);

      const response = await fetch(url.toString(), {
        method: "GET",
      });
      const data = await response.json();

      setWalletData(data);
    }
    downloadData();
  }, [show]);

  return (
    <div>
      {metrics && show && (
        <div>
          <h1 className="font-bold text-base-content tracking-wide text-xl">
            Metrics
          </h1>
          <dl className="w-full flex flex-row mx-auto items-center justify-center">
            <div className="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-base-content truncate">
                Unique Users:
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-base-content">
                {metrics?.count_users}
              </dd>
            </div>

            <div className="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-base-content truncate">
                Accessed:
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-base-content">
                {metrics?.count_views}
              </dd>
            </div>

            <div className="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-base-content truncate">
                Attempts (Not Enough):
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-base-content">
                {metrics?.count_notenough}
              </dd>
            </div>
          </dl>
          {walletData?.result?.length > 0 ? (
            <CSVLink
              data={walletData?.result}
              filename={`${link?.id}-walletdata.csv`}
            >
              <button className="w-full p-2 btn btn-gradient text-primary-content  buttontext mb-4">
                <div className="flex flex-row space-x-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download List of Wallets/Timestamp</span>
                </div>
              </button>
            </CSVLink>
          ) : (
            <span className="w-full p-2 btn btn-primary text-primary-content  buttontext mb-4">
              <div className="flex flex-row space-x-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>No Wallet/Timestamp Data to Download</span>
              </div>
            </span>
          )}
          <Access link={link}></Access>
          <button
            className="w-full p-2 btn btn-netural text-primary-content  buttontext mb-4"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      )}
      {(!metrics || !show) && (
        <button
          className="mt-4 w-full lg:w-1/2 mx-auto flex justify-center p-2 btn btn-primary text-primary-content  buttontext mb-4"
          onClick={() => setShow(true)}
        >
          Link Analytics
        </button>
      )}
    </div>
  );
}
