import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function OverlayBox({
  open,
  setOpen,
  title,
  inputs,
  submitButtonText,
  setSubmitButton,
  loadingButtonText,
  functionParameters,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitButton.apply(this, functionParameters);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen md:px-8 lg:px-0">
          <Dialog.Overlay className="fixed inset-0 bg-base-100 backdrop-blur-md bg-opacity-30 cursor-pointer" />
          <div className="relative bg-base-100 border border-base-300 shadow-mg pt-14 md:pt-8 w-full h-full min-h-screen md:h-auto md:min-h-0 md:max-w-3xl md:rounded-box p-8">
            <div className="block absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="rounded-md text-base-content opacity-80 hover:opacity-100 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex text-2xl font-bold text-base-content tracking-wider">
                {title}
              </div>
              {inputs.map((item) => (
                <div className="flex flex-col space-y-2">
                  <label className="block text-sm font-medium text-base-content opacity-80">
                    {item.label}
                  </label>
                  <div>
                    <input
                      data-tip={item.tooltip}
                      type="text"
                      name={item.label}
                      onChange={(e) => item.updateFunction(e.target.value)}
                      id={item.label}
                      className="flex input input-primary w-full"
                    />
                  </div>
                </div>
              ))}
              <div className="flex">
                {!loading ? (
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="flex btn btn-primary"
                  >
                    {submitButtonText}
                  </button>
                ) : (
                  <button disabled className="flex btn btn-primary">
                    {loadingButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
