import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useOvermind } from 'stores/Overmind';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export const tokenUpdate = async (jwt, token, attr) => {
  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jwt: jwt,
      tid: token?.tid,
      ...attr,
    }),
  };

  console.log('requestOptions', requestOptions);
  return await fetch(`${TPP}/api/v2/tokens/update`, requestOptions)
    .then((response) => response.json())
    .then((resp) => {
      if (resp && resp.status === 'fail') alert('Cannot save: ' + resp.message);
      else {
        // setHidden(!hidden);
      }
    })
    .catch((e) => {
      alert(e);
    });
};

export default function HideButton({ token }) {
  const { state: ostate, actions } = useOvermind();
  const [hidden, setHidden] = useState(null);

  useEffect(() => {
    if (token?.hidden != null) setHidden(token?.hidden);
  }, [token?.hidden]);

  return (
    <div
      id="hideButton"
      className="group cursor-pointer flex flex-row space-x-1 items-center text-base-content/50 hover:text-base-content transition ease-in-out duration-200"
      onClick={() =>
        tokenUpdate(ostate.user.jwt, token, { hidden: !hidden }).then(() => {
          setHidden(!hidden);
        })
      }
    >
      <div className="block group-hover:hidden">
        {hidden ? (
          <EyeSlashIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </div>
      <div className="hidden group-hover:block">
        {hidden ? (
          <EyeIcon className="w-5 h-5" />
        ) : (
          <EyeSlashIcon className="w-5 h-5" />
        )}
      </div>
      <p className="block group-hover:hidden text-base-content/50 group-hover:text-base-content text-sm font-medium">
        {hidden ? 'Hidden' : 'Visible'}
      </p>
      <p className="hidden group-hover:block text-base-content/50 group-hover:text-base-content text-sm font-medium">
        {hidden ? 'Unhide NFT' : 'Hide NFT'}
      </p>
    </div>
  );
}
