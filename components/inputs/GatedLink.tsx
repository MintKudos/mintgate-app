import React from 'react';
import { useRouter } from 'next/router';
import { isplatformURL } from 'utils/tpp';
import { useDebounce, useSearchParam } from 'react-use';
import Input from 'mintflow/Input';

export default function GatedLink({
  formURL,
  setFormURL,
  warning,
  setWarning,
  hasAnID,
}) {
  const router = useRouter();
  const ticket = useSearchParam('ticket');

  let isValidURL = isplatformURL(formURL);

  return (
    <div
      className={`justify-center w-full ${!hasAnID ? 'hidden' : ''} ${
        ticket ? 'hidden' : 'block '
      }`}
    >
      <div className="form-control">
        <Input
          variant="primary"
          required
          value={formURL}
          onFocus={() => setWarning(false)}
          onBlur={() => setWarning(true)}
          onChange={(e) => setFormURL(e.target.value)}
          id="form_url"
          name="contentUrl"
          placeholder="Paste the link to share"
          className="w-full body2"
        />
      </div>
      {/* 
      {formURL && warning && isValidURL &&
        <p className="mt-4 mb-4 justify-center flex items-center text-green-500  caption-small"><svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
          This is a supported platform.
        </p>}
      {formURL && warning && !isValidURL &&
        <p className="mt-4 mb-4 justify-center flex items-center text-yellow-600  caption-small">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          This website is untested. If there's any issues accessing this site, please contact us!
        </p>}
        */}
    </div>
  );
}
