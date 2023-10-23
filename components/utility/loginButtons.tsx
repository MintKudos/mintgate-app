import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useOvermind } from 'stores/Overmind';

import { disconnect } from './withWallet';
import { useAsync } from 'react-use';

export default function LoginButtons() {
  const [returnTo, setReturn] = useState(null);
  const router = useRouter();
  const { state: ostate, actions } = useOvermind();
  const [open, setOpen] = useState(false);

  function openWallet() {
    disconnect();
    actions.removeWallet();
    console.log('---openWallet---');
    setOpen(true);

    actions.triggerWallet();
  }

  if (ostate.user.uid) return <h1>Loading...</h1>;

  return (
    <div className="w-full flex flex-col justify-start space-y-4">
      <div onClick={openWallet}>
        <div className="group cursor-pointer transition duration-450 ease-in-out transform hover:scale-99 hover:ring-2 hover:ring-primary hover:ring-opacity-50 border-2 border-base-300 shadow-mg hover:shadow-mgs rounded-box relative group bg-base-100 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
          <div className="flex space-x-4 items-center">
            <div className="w-10 h-10 flex space-x-0 items-center justify-center rounded-box bg-base-300">
              <svg
                viewBox="0 0 212 189"
                focusable="false"
                className="hidden group-hover:block h-6 w-6"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#CDBDB2"
                    d="M61 173l27 8v-10l3-2h15v19H89l-20-9zM151 173l-27 8v-10l-2-2h-16v19h17l21-9z"
                  ></path>
                  <path
                    fill="#393939"
                    d="M91 152l-3 19 3-2h29l4 2-2-19-5-2H95z"
                  ></path>
                  <path
                    fill="#F89C35"
                    d="M75 27l14 32 6 91h22l7-91 12-32z"
                  ></path>
                  <path
                    fill="#F89D35"
                    d="M16 96L1 142l39-2h25v-20l-1-41-5 5z"
                  ></path>
                  <path fill="#D87C30" d="M46 101l46 1-5 24-22-6z"></path>
                  <path fill="#EA8D3A" d="M46 102l19 18v18z"></path>
                  <path fill="#F89D35" d="M65 120l23 6 7 24-5 3-25-15z"></path>
                  <path fill="#EB8F35" d="M65 138l-4 35 30-21z"></path>
                  <path fill="#EA8E3A" d="M92 102l3 48-8-24z"></path>
                  <path fill="#D87C30" d="M39 139l26-1-4 35z"></path>
                  <path fill="#EB8F35" d="M13 188l48-15-22-34-38 3z"></path>
                  <path fill="#E8821E" d="M89 59L65 79l-19 22 46 2z"></path>
                  <path
                    fill="#DFCEC3"
                    d="M61 173l30-21-3 18v11l-20-4zM150 173l-29-21 2 18v11l21-4z"
                  ></path>
                  <path fill="#393939" d="M80 113l6 12-22-5z"></path>
                  <path fill="#E88F35" d="M12 1l77 58-13-32z"></path>
                  <path
                    fill="#8E5A30"
                    d="M12 1L2 32l6 33-4 3 6 5-5 4 6 5-4 4 9 11 43-13 30-25L12 1z"
                  ></path>
                  <path
                    fill="#F89D35"
                    d="M196 96l15 46-39-2h-25v-20l1-41 5 5z"
                  ></path>
                  <path fill="#D87C30" d="M166 101l-46 1 5 24 22-6z"></path>
                  <path fill="#EA8D3A" d="M166 102l-19 18v18z"></path>
                  <path
                    fill="#F89D35"
                    d="M147 120l-23 6-7 24 5 3 25-15z"
                  ></path>
                  <path fill="#EB8F35" d="M147 138l4 35-29-20z"></path>
                  <path fill="#EA8E3A" d="M120 102l-3 48 8-24z"></path>
                  <path fill="#D87C30" d="M173 139l-26-1 4 35z"></path>
                  <path fill="#EB8F35" d="M199 188l-48-15 22-34 38 3z"></path>
                  <path fill="#E8821E" d="M123 59l24 20 19 22-46 2z"></path>
                  <path fill="#393939" d="M131 113l-6 12 22-5z"></path>
                  <path fill="#E88F35" d="M200 1l-77 58 13-32z"></path>
                  <path
                    fill="#8E5A30"
                    d="M199 1l10 31-5 33 4 3-6 5 4 4-6 5 4 4-9 11-42-13-30-25 76-58z"
                  ></path>
                </g>
              </svg>
              <svg
                viewBox="0 0 300 185"
                focusable="false"
                className="block group-hover:hidden h-6 w-6"
              >
                <g>
                  <path
                    fill="#3B99FC"
                    d="M61 36c49-48 129-48 178 0l5 6c3 2 3 6 0 9l-20 19c-1 2-3 2-4 0l-8-8a89 89 0 00-124 0l-8 9h-5L55 51c-2-2-2-6 0-8l6-7zm219 41l18 18c3 2 3 6 0 8l-81 79c-2 3-6 3-9 0l-57-56h-2l-57 56c-3 3-7 3-9 0L2 103c-3-2-3-6 0-8l18-18c2-2 6-2 9 0l57 56a2 2 0 002 0l58-56a6 6 0 018 0l58 56h2l57-56c3-2 7-2 9 0z"
                  ></path>
                </g>
              </svg>
            </div>
            <h1 className="font-semibold text-lg text-base-content">
              Connect wallet or email sign in
            </h1>
          </div>
        </div>
      </div>
      {/* <div>
        <p className="text-base-content/60 text-xs">
          Used Twitter? Login with your connected wallet above.
        </p>
        <a onClick={onTwitter} className="underline cursor-pointer text-xs">
          Click Here to use the old Twitter login
        </a>
      </div> */}
      {/* <a onClick={onTwitter}>
        <div className="bg-gray cursor-pointer transition duration-450 ease-in-out transform hover:scale-99 hover:ring-2 hover:ring-primary hover:ring-opacity-50 border-2 border-base-300 shadow-mg hover:shadow-mgs rounded-box relative group bg-base-100 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary">
          <div className="bg-gray flex space-x-4 items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-box bg-base-300">
              <svg
                aria-label="Twitter Logo"
                className="w-6 h-6 text-primary"
                focusable="false"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" opacity="0"></path>
                <path
                  d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                  fill="#1D9BF0"
                ></path>
              </svg>
            </div>
            <h1 className="font-semibold text-lg text-base-content">
              Connect Twitter Account (not recommended)
              <br />
              <span className="font-light text-sm">
                (must link your existing wallet - will be removed)
              </span>
            </h1>
          </div>
        </div>
      </a> */}
    </div>
  );
}
