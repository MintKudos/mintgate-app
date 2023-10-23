import { CheckIcon } from '@heroicons/react/24/solid';
import React, { forwardRef } from 'react';

export type StepsProps = {
  status1: 'current' | 'complete' | 'upcoming';
  status2: 'current' | 'complete' | 'upcoming';
  status3: 'current' | 'complete' | 'upcoming';
  link1?: string;
  link2?: string;
  link3?: string;
  step1: string;
  step2: string;
  step3: string;
};

const Steps = forwardRef<HTMLButtonElement, StepsProps>(
  ({
    status1,
    status2,
    status3,
    link1,
    link2,
    link3,
    step1,
    step2,
    step3,
  }): JSX.Element => {
    const steps = [
      { id: '01', name: step1, href: link1, status: status1 },
      { id: '02', name: step2, href: link2, status: status2 },
      { id: '03', name: step3, href: link3, status: status3 },
    ];

    return (
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-base-300 rounded-md border border-base-300 md:flex md:divide-y-0"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === 'complete' ? (
                <a
                  href={step.href}
                  className="group flex w-full items-center cursor-pointer"
                >
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-secondary">
                      <CheckIcon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-base-content">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.status === 'current' ? (
                <a
                  href={step.href}
                  className="flex items-center px-6 py-4 text-sm font-medium cursor-pointer"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-primary">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary">
                    {step.name}
                  </span>
                </a>
              ) : (
                <a
                  href={step.href}
                  className="group flex items-center cursor-pointer"
                >
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-base-300 group-hover:border-gray-400">
                      <span className="text-base-content/60 group-hover:text-base-content">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-base-content/60 group-hover:text-base-content">
                      {step.name}
                    </span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute top-0 right-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-base-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Steps.displayName = 'Steps';

export default Steps;
