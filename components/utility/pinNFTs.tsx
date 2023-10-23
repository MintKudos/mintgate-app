import React from 'react';
import { useOvermind } from 'stores/Overmind';
import { BookmarkIcon } from '@heroicons/react/24/solid';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function PinNFT({ token }) {
  const { state: ostate } = useOvermind();

  async function pinNFT() {
    const url = new URL(`${TPP}/api/v2/tokens/updatePinnedTokens`);

    // console.log('token', token);

    fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jwt: ostate.user.jwt,
        queryType: 'user',
        actionType: !!token?.pinned ? 'delete' : 'add',
        tid: token?.to_tid || token?.tid,
        // "brand": 0,
      }),
    })
      .then((response) => response.json())
      .then(async (r) => {
        if (r && r.status === 'fail') {
          alert('Could not save: ' + r.message);
        } else {
          alert(`${token?.name} is now ${!!token?.pinned ? 'un' : ''}pinned`);
          window.location.reload();
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  // Do not show for non-creators
  if (!ostate.user.creator) return null;

  return (
    <div
      className={`group cursor-pointer flex flex-row space-x-1 items-center ${
        token?.pinned
          ? 'text-primary'
          : 'text-base-content/50 hover:text-base-content'
      }`}
      onClick={() => pinNFT()}
    >
      <BookmarkIcon className="w-5 h-5" />
      <p
        className={`${
          token?.pinned
            ? 'text-primary'
            : 'text-base-content/50 group-hover:text-base-content'
        } text-sm font-medium`}
      >
        {token?.pinned ? 'Pinned Project' : 'Pin Project'}
      </p>
    </div>
  );
}
