import React from 'react';
import Countdown from 'react-countdown';
import CountdownShow from '../../mintflow/Countdown';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function GoalWidget({ goals, sales }) {
  function salesPercent(target, actual) {
    if (!target) return;
    if (!actual || actual == null) actual = 0;
    return (target / actual) * 100;
  }

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed || goals?.target === sales) {
      // Render a completed state
      return (
        <span className="text-3xl countdown">
          {sales === goals?.target
            ? 'The Goal has been reached'
            : 'The Goal has not been reached'}
        </span>
      );
    } else {
      // Render a countdown
      return (
        <CountdownShow
          days={days}
          minutes={minutes}
          hours={hours}
          seconds={seconds}
          color="text-base-content"
        ></CountdownShow>
      );
    }
  };

  return (
    <>
      {goals?.prize ? (
        <div className="space-y-4 mt-4 overflow-y-auto">
          <div className="flex flex-col justify-center border border-base-300 p-6 rounded-box space-y-6">
            <div className="grid grid-flow-col gap-8 place-items-end mx-auto">
              <h1>
                <Countdown
                  className="text-4xl text-base-content"
                  date={goals?.time}
                  renderer={renderer}
                ></Countdown>
              </h1>
            </div>
            {/* Placholder for when the Gaol is reached / not reached
        <h1 className="text-xl"> THE GOAL HAS BEEN REACHED</h1>
        <h1 className="text-xl"> THE GOAL HAS NOT BEEN REACHED</h1>
        */}
            <progress
              className="progress progress-gradient"
              value={salesPercent(goals?.target, sales)}
              max="100"
            ></progress>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-bold">
                  {sales ? sales : '0'} NFTs
                </h3>
                <p className="opacity-50 text-sm">Currently Sold</p>
              </div>
              <div className="flex flex-col w-full">
                <h3 className="text-xl gradient-four font-bold">
                  {goals?.target} NFTs
                </h3>
                <p className="opacity-50 text-sm">Sale Goal</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl">Reward:</h2>
              <p className="mt-1 opacity-80 text-base w-72">{goals?.prize}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
