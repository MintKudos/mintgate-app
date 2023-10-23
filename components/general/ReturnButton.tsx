import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function ReturnButton({ returnState, setReturn, buttonLabel }) {
  return (
    <button
      onClick={() => setReturn(returnState)}
      className="w-1/2 mt-2 btn btn-primary text-primary-content space-x-4"
    >
      <ArrowLeftIcon className="flex w-6 h-6" />
      <span className="flex">{buttonLabel}</span>
    </button>
  );
}
