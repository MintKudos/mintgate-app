import React from 'react';
import { useOvermind } from 'stores/Overmind';
import Tilt from 'react-tilt';

export default function TriggerWallet() {
  const { state: ostate, actions } = useOvermind();

  return (
    <div className="h-screen bg-base-100 bg-mint bg-cover -mt-12 pt-24">
      <div className="flex flex-col justify-center items-center">
        <div className="mx-auto relative py-24 h-full">
          <h1 className=" text-center text-5xl font-semibold tracking-wide text-base-content max-w-4xl mx-auto">
            Please connect your
          </h1>
          <h1 className=" text-center text-5xl font-semibold tracking-wide gradient-four max-w-4xl mx-auto">
            crypto wallet
          </h1>
          <div className="mt-10 max-w-sm mx-auto sm:flex sm:justify-center">
            <div className="space-y-4 space-x-4 sm:space-y-0">
              <Tilt className="Tilt" options={{ max: 15, scale: 1.05 }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e?.preventDefault();
                    actions.triggerWallet();
                  }}
                >
                  <div className="p-0.5 bg-base-300 transition duration-700 ease-in hover:bg-gradient-to-tr from-primary via-secondary to-accent rounded-box hover:shadow-mg">
                    <div className="cursor-pointer bg-base-100 pt-4 pb-6 px-6 rounded-box space-y-3">
                      <div className="flex space-x-3">
                        <svg
                          viewBox="0 0 212 189"
                          focusable="false"
                          className="h-6 w-6"
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
                            <path
                              fill="#D87C30"
                              d="M46 101l46 1-5 24-22-6z"
                            ></path>
                            <path fill="#EA8D3A" d="M46 102l19 18v18z"></path>
                            <path
                              fill="#F89D35"
                              d="M65 120l23 6 7 24-5 3-25-15z"
                            ></path>
                            <path
                              fill="#EB8F35"
                              d="M65 138l-4 35 30-21z"
                            ></path>
                            <path fill="#EA8E3A" d="M92 102l3 48-8-24z"></path>
                            <path fill="#D87C30" d="M39 139l26-1-4 35z"></path>
                            <path
                              fill="#EB8F35"
                              d="M13 188l48-15-22-34-38 3z"
                            ></path>
                            <path
                              fill="#E8821E"
                              d="M89 59L65 79l-19 22 46 2z"
                            ></path>
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
                            <path
                              fill="#D87C30"
                              d="M166 101l-46 1 5 24 22-6z"
                            ></path>
                            <path fill="#EA8D3A" d="M166 102l-19 18v18z"></path>
                            <path
                              fill="#F89D35"
                              d="M147 120l-23 6-7 24 5 3 25-15z"
                            ></path>
                            <path
                              fill="#EB8F35"
                              d="M147 138l4 35-29-20z"
                            ></path>
                            <path
                              fill="#EA8E3A"
                              d="M120 102l-3 48 8-24z"
                            ></path>
                            <path
                              fill="#D87C30"
                              d="M173 139l-26-1 4 35z"
                            ></path>
                            <path
                              fill="#EB8F35"
                              d="M199 188l-48-15 22-34 38 3z"
                            ></path>
                            <path
                              fill="#E8821E"
                              d="M123 59l24 20 19 22-46 2z"
                            ></path>
                            <path
                              fill="#393939"
                              d="M131 113l-6 12 22-5z"
                            ></path>
                            <path
                              fill="#E88F35"
                              d="M200 1l-77 58 13-32z"
                            ></path>
                            <path
                              fill="#8E5A30"
                              d="M199 1l10 31-5 33 4 3-6 5 4 4-6 5 4 4-9 11-42-13-30-25 76-58z"
                            ></path>
                          </g>
                        </svg>
                        <svg
                          viewBox="0 0 40 36"
                          focusable="false"
                          className="h-6 w-6"
                        >
                          <g>
                            <path
                              fill="#FF875B"
                              d="M25 0H15l-1 1c0 9-5 19-14 25v1l6 9h1c5-4 10-9 13-15 3 6 7 11 12 15h1l6-9v-1c-8-6-13-16-14-25V0z"
                            ></path>
                          </g>
                        </svg>
                        <svg
                          viewBox="0 0 300 185"
                          focusable="false"
                          className="h-6 w-6"
                        >
                          <g>
                            <path
                              fill="#3B99FC"
                              d="M61 36c49-48 129-48 178 0l5 6c3 2 3 6 0 9l-20 19c-1 2-3 2-4 0l-8-8a89 89 0 00-124 0l-8 9h-5L55 51c-2-2-2-6 0-8l6-7zm219 41l18 18c3 2 3 6 0 8l-81 79c-2 3-6 3-9 0l-57-56h-2l-57 56c-3 3-7 3-9 0L2 103c-3-2-3-6 0-8l18-18c2-2 6-2 9 0l57 56a2 2 0 002 0l58-56a6 6 0 018 0l58 56h2l57-56c3-2 7-2 9 0z"
                            ></path>
                          </g>
                        </svg>
                        <span>🌈</span>
                        <span className=" text-xl tracking-wider text-base-content opacity-80">
                          ...
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h1 className=" font-semibold text-xl text-base-content">
                          Connect a crypto wallet
                        </h1>
                        <p className=" text-base-content opacity-80 text-sm">
                          Connect your crypto wallet, <br /> or create a new one
                          to get started!
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
