import React, { useEffect, useState } from "react";
import EditLink from "components/Links/edit";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Dialog } from "@headlessui/react";
import Button from "mintflow/Button";

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function EditLinkModal({ link, token }) {
  const [editLink, setEditLink] = useState(false);

  //console.log("link", link);

  return (
    <div>
      <Button
        variant="nav"
        size="sm"
        circle
        onClick={() => {
          setEditLink(true);
        }}
      >
        <PencilIcon className="w-4 h-4" />
      </Button>
      <div>
        {editLink && (
          <Dialog
            open={editLink}
            onClose={() => setEditLink(false)}
            className="fixed z-50 inset-0 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen md:px-8 lg:px-0">
              <Dialog.Overlay className="fixed inset-0 bg-base-100 backdrop-blur-md bg-opacity-30 cursor-pointer" />
              <div className="mr-0 relative bg-base-100 border border-base-300 shadow-mg pt-14 md:pt-8 w-full h-full min-h-screen md:h-auto md:min-h-0 md:max-w-lg md:rounded-box p-8">
                <div className="block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => setEditLink(false)}
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
                <div>
                  <EditLink
                    open={editLink}
                    setEditLink={setEditLink}
                    link={link}
                    token={token}
                  ></EditLink>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
}
