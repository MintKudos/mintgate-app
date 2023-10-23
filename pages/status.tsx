import React, { useEffect, useState } from "react";
import { useOvermind, getNetworkDisplay } from "stores/Overmind";
const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function Status() {
  const [state, setState] = useState({
    title: '',
    message: '',
    token: "",
    amount: "",
    symbol: "",
    ttype: "",
  });
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    let token = sp.get("token");
    const amount = sp.get("amount");
    const network = sp.get("network");
    const ttype = sp.get("ttype");
    const handle = sp.get("handle");
    const already_accessed = sp.get("already_accessed");

    let title, message;
    if (already_accessed) {
      title = 'Link access already claimed';
      message = 'Sorry, this link was already accessed by your token and no longer can access again.'
    }

    setState((x) => ({
      ...x,
      token: token,
      amount: amount,
      ttype: ttype,
      handle,
      title, message
    }));
  }, []);

  const getTokenParam = () => {
    const sp = new URLSearchParams(window.location.search);
    const token = sp.get("token");
    const tid = sp.get("tid");
    const ttype = sp.get("ttype");
    const subid = sp.get("subid");
    const handle = sp.get("handle");
    const network = sp.get("network");
    const already_accessed = sp.get("already_accessed");

    const callback = decodeURIComponent(sp.get("callback"));
    window.open(callback); // , "_blank"
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-xl p-8 z-10 mx-8 md:mx-auto mt-20">
        <h2 className="text-center text-5xl font-bold  text-base-content mb-4">
          😵
        </h2>
        <h1 className="text-4xl font-semibold  mb-2 text-base-content text-center">
          {state.title}
        </h1>
        <p className="text-base leading-normal text-center my-6 ">
          {state.message}
        </p>
        <div className="flex flex-wrap items-stretch w-full mt-3 relative">
          <button
            className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-medium rounded-md text-base-content bg-neutral hover:bg-indigo-400 focus:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            onClick={getTokenParam}
          >Continue
          </button>
        </div>
      </div>
    </div>
  );
}
