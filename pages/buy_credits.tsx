import React from 'react';
import BuyCredits from 'components/Content/BuyCredits';

export default function Example() {
  return (
    <div className="h-screen">
      <div className="mt-8 bg-base-100 pb-16 sm:mt-16 sm:pb-20 lg:pb-28">
        <div className="relative mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <BuyCredits />
        </div>
      </div>
    </div>
  );
}
