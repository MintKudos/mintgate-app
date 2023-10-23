import React from 'react';
import { useRouter } from 'next/router';
import { useSearchParam } from 'react-use';

export default function GatedLinkTitle({ setLinkTitle, hasAnID }) {
  const router = useRouter();
  const ticket = useSearchParam('ticket');

  return (
    <div className={`justify-center w-full pb-5 ${!hasAnID ? 'hidden' : ''}`}>
      <h3 className="pb-2 text-left  font-bold opacity-80 text-base-content flex justify-start">
        {ticket ? 'Event Title' : 'Title (short description)'}
      </h3>
      <input
        required
        onChange={(e) => setLinkTitle(e.target.value)}
        id="linkTitle"
        name="linkTitle"
        placeholder="Check out this exclusive content!"
        className="input input-bordered input-primary focus:input-accent w-full  caption-small mb-3"
      />
    </div>
  );
}
