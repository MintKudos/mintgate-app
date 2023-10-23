import React from "react";
import LinkRedirectButtons from "../buttons/LinkRedirectButtons";
import { getTokenType } from "hooks/getTokenType";

export default function LinkRequirementDisplay({ linkInfo, hideBuy }) {
  if (!linkInfo) return null;

  return (
    <div className="max-w-lg mx-auto word-wrap text-center">
      {linkInfo && linkInfo.length == 1 && (
        <p className=" font-xs text-base-content">
          This link requires
          <span className="break-words text-lg  gradient-four">
            {" "}
            {linkInfo[0].minbal} {getTokenType(linkInfo[0])}
          </span>{" "}
          to access.
          {window.location.pathname !== "/wallet" && !hideBuy ? (
            <LinkRedirectButtons
              ttype={linkInfo?.[0].ttype}
              symbol={linkInfo?.[0].symbol}
              token={linkInfo?.[0].address}
              subid={linkInfo?.[0].subid}
              address={linkInfo?.[0].address}
              network={linkInfo?.[0].network}
              id={linkInfo?.[0].id}
            />
          ) : (
            ""
          )}
        </p>
      )}
      {linkInfo && linkInfo.length > 1 && (
        <div className=" font-bold text-xs text-base-content">
          This link requires
          <ul>
            {linkInfo &&
              linkInfo.map((t) => (
                <li key={t?.id + " " + t?.address}>
                  {" "}
                  {t.minbal}
                  <span className="break-words text-lg  text-neutra gradient-four">
                    {" "}
                    {getTokenType(t)}
                  </span>
                  {window.location.pathname !== "/wallet" && !hideBuy ? (
                    <LinkRedirectButtons
                      ttype={t?.ttype}
                      symbol={t?.symbol}
                      token={t?.address}
                      subid={t?.subid}
                      address={t?.address}
                      network={t?.network}
                      id={t?.id}
                    />
                  ) : (
                    ""
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
