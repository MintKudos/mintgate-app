import React, { useEffect } from "react";
import Countdown from "react-countdown";
import CountdownShow from "../../mintflow/Countdown";
import Fastly, { BIG_NFT_SIZE } from "components/utility/Fastly";
import { useOvermind } from "stores/Overmind";

export default function ReleaseDate({
  linkInfo,
  timeComplete,
  onTimeComplete,
}) {
  const { state: ostate } = useOvermind();

  // Conditions to hide timer
  useEffect(() => {
    if (timeComplete) return;
    if (!linkInfo) return;

    if (!linkInfo?.release_date) onTimeComplete(true);
    // else if (checkAfterDate(linkInfo?.release_date)) { // not needed, timer will handle this
    //   console.log('after date now');
    //   onTimeComplete(true);
    // }
  }, [linkInfo]);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      if (!timeComplete) onTimeComplete(true);
      return null;
    } else {
      return (
        <CountdownShow
          days={days}
          minutes={minutes}
          hours={hours}
          seconds={seconds}
          linkOverlay={true}
          colon={false}
          color="text-base-content"
        ></CountdownShow>
      );
    }
  };

  if (timeComplete) return null;

  return (
    <div className="w-screen h-screen justify-center items-center pt-16 p-6 rounded-box">
      {linkInfo?.release_date && (
        <div className="absolute w-screen h-screen rounded-box top-0 flex items-center text-base-content text-shadow-xl justify-center z-10 flex-col">
          <h1 className="mb-12 text-4xl text-shadow-lg md:text-7xl w-full text-center">
            {linkInfo?.title}
          </h1>
          <Countdown date={linkInfo?.release_date} renderer={renderer} />
        </div>
      )}
      <Fastly
        width={BIG_NFT_SIZE}
        alt={linkInfo?.title}
        className={`${
          new Date(linkInfo?.release_date) >= new Date() && "opacity-40"
        } w-full h-full object-cover rounded-box`}
        src={linkInfo?.img || linkInfo?.banner || ostate.user.photo}
      />
    </div>
  );
}
