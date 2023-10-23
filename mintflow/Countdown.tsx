import React, { useState, useEffect, useRef } from 'react';

export default function Countdown({
  days,
  hours,
  minutes,
  seconds,
  linkOverlay,
  colon,
  color,
}: {
  days;
  hours;
  minutes;
  seconds;
  linkOverlay?;
  colon?;
  color?;
}) {
  const countdownColor = color ? color : 'text-base-content';

  return (
    <div
      className={`grid grid-flow-col ${
        linkOverlay ? 'gap-5' : 'gap-0'
      } text-center auto-cols-max`}
    >
      <div
        className={`flex flex-col ${
          linkOverlay
            ? 'p-4 bg-base-100 shadow-lg border-base-300'
            : 'p-2 text-shadow-lg'
        } rounded-box ${countdownColor}`}
      >
        <span
          className={`font-heading font-bold countdown ${
            linkOverlay ? 'text-4xl md:text-8xl' : 'text-3xl'
          }`}
        >
          <span style={{ '--value': days } as React.CSSProperties}></span>
        </span>
        <span
          className={`font-body text-base ${
            linkOverlay ? 'text-xl' : 'text-xs'
          }`}
        >
          days
        </span>
      </div>
      <div
        className={`flex flex-col ${
          linkOverlay
            ? 'p-4 bg-base-100 shadow-lg border-base-300'
            : 'p-2 text-shadow-lg'
        } rounded-box ${countdownColor}`}
      >
        <span
          className={`font-heading font-bold countdown ${
            linkOverlay ? 'text-4xl md:text-8xl' : 'text-3xl'
          }`}
        >
          <span style={{ '--value': hours } as React.CSSProperties}></span>
        </span>
        <span
          className={`font-body text-base ${
            linkOverlay ? 'text-xl' : 'text-xs'
          }`}
        >
          hours
        </span>
      </div>
      <div
        className={`flex flex-col ${
          linkOverlay
            ? 'p-4 bg-base-100 shadow-lg border-base-300'
            : 'p-2 text-shadow-lg'
        } rounded-box ${countdownColor}`}
      >
        <span
          className={`font-heading font-bold countdown ${
            linkOverlay ? 'text-4xl md:text-8xl' : 'text-3xl'
          }`}
        >
          <span style={{ '--value': minutes } as React.CSSProperties}></span>
        </span>
        <span
          className={`font-body text-base ${
            linkOverlay ? 'text-xl' : 'text-xs'
          }`}
        >
          min
        </span>
      </div>
      <div
        className={`flex flex-col ${
          linkOverlay
            ? 'p-4 bg-base-100 shadow-lg border-base-300'
            : 'p-2 text-shadow-lg'
        } rounded-box ${countdownColor}`}
      >
        <span
          className={`font-heading font-bold countdown ${
            linkOverlay ? 'text-4xl md:text-8xl' : 'text-3xl'
          }`}
        >
          <span style={{ '--value': seconds } as React.CSSProperties}></span>
        </span>
        <span
          className={`font-body text-base ${
            linkOverlay ? 'text-xl' : 'text-xs'
          }`}
        >
          sec
        </span>
      </div>
    </div>
  );
}
