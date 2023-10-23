import React from 'react';
import { useAsync } from 'react-use';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { useOvermind } from 'stores/Overmind';

export default function MainData({
  titleName,
  data,
  mainColor,
  secondaryColor,
}) {
  const { state: ostate, actions } = useOvermind();

  mainColor = mainColor || 'bg-violet-400';
  secondaryColor = secondaryColor || 'bg-violet-100';

  return (
    <div
      id={titleName}
      className={`flex flex-col border border-8 border-slate-400 shadow-sm border-opacity-50 space-y-1 px-8 py-8 sm:pt-6 sm:px-4 rounded-2xl overflow-hidden bg-white mx-auto overflow-hidden my-auto md:h-44"`}
    >
      <div className="mt-5 mx-auto flex flex-col">
        <div className="flex uppercase tracking-wide text-sm mx-auto">
          {titleName}
        </div>
        <div className="flex uppercase font-normal text-6xl mx-auto">
          {data}
        </div>
      </div>
    </div>
  );
}
