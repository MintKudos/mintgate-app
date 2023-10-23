import { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function InlineEdit({
  value,
  setValue,
  originalValue,
  handleSubmit,
  editing,
  setEditing,
}) {
  const { state: ostate, actions } = useOvermind();

  useEffect(() => {
    setValue(value);
  }, [value]);

  const onSave = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    handleSubmit();
    setEditing(false);
  };

  //console.log('originalValue', originalValue);

  const onClose = (e) => {
    setValue(originalValue);
    setEditing(false);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  return (
    <div className="flex flex-row space-x-4 w-full">
      <input
        className="flex text-center w-full text-xl md:text-2xl font-medium text-base-content bg-transparent border-none appearance-none cursor-text outline-none hover:underline hover:underline-offset-4 hover:decoration-4"
        value={value ? value : ''}
        onKeyDown={onKeyDown}
        onClick={() => setEditing(true)}
        onChange={(e) => setValue(e.target.value)}
      />
      {editing && (
        <div className="mt-1 flex flex-row space-x-2">
          <button className="flex" onClick={(e) => onSave(e)}>
            <CheckCircleIcon className="text-base-content h-6 w-6"></CheckCircleIcon>
          </button>
          <button className="flex" onClick={(e) => onClose(e)}>
            <XCircleIcon className="text-base-content h-6 w-6"></XCircleIcon>
          </button>
        </div>
      )}
    </div>
  );
}
