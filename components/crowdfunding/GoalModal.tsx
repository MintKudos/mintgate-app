import React, { useState, useEffect } from 'react';
import { useOvermind } from 'stores/Overmind';
import DateTime from 'react-datetime';
import moment from 'moment';

const TPP = process.env.NEXT_PUBLIC_TPP_SERVER || `https://mgate.io`;

export default function GoalModal({ tid, goals }) {
  const { state: ostate } = useOvermind();
  const [newTime, setTime] = useState<any>();
  const [newTarget, setTarget] = useState<string>();
  const [newPrize, setPrize] = useState<string>();

  useEffect(() => {
    if (goals?.time) setTime(goals.time);
    if (goals?.target) setTarget(goals.target);
    if (goals?.prize) setPrize(goals.prize);
  }, [goals]);

  /*console.log('newTime', newTime);
  console.log('newTarget', newTarget);
  console.log('newPrize', newPrize);
  console.log('jwt', ostate.user.jwt);
  console.log('tid', tid);*/

  let inputProps = {
    placeholder: '--/--/-- hh:ss',
    className: 'input w-full text-base-content',
  };

  const inputFields = [
    {
      label: 'Goal end time (in utc)',
      setFunction: setTime,
      value: newTime,
      customInput: (
        <DateTime
          inputProps={inputProps}
          input={true}
          timeFormat={true}
          utc={true}
          initialValue={new Date(goals?.time)}
          onChange={(value: any) => setTime(value._d)}
        />
      ),
    },
    {
      label: 'Target Sales',
      setFunction: setTarget,
      value: newTarget,
      input: true,
      inputType: 'number',
    },
    {
      label: 'Write a short description what happens when the goal is reached:',
      setFunction: setPrize,
      value: newPrize,
      textArea: true,
    },
  ];

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jwt: ostate.user.jwt,
        tid: tid,
        time: newTime,
        target: newTarget,
        prize: newPrize,
      }),
    };
    fetch(`${TPP}/api/v2/tokens/update`, requestOptions)
      .then((response) => response.json())
      .then((resp) => {
        if (resp && resp.status === 'fail')
          alert('Cannot save: ' + resp.message);
        else {
          alert(
            `Your goal of ${newTarget} NFTs sold by ${new Date(
              newTime
            ).toUTCString()} with a reward of ${newPrize} has been added`
          );
          window.location.reload();
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <form>
        <div>
          <h3 className="text-lg leading-6 font-medium text-base-content">
            Goal Details
          </h3>
        </div>
        <div className="w-full flex flex-col space-y-4">
          {inputFields.map((input) => (
            <div className={`w-full`}>
              <label className="block text-sm font-medium text-base-content opacity-80">
                {input?.label}
              </label>
              <div className="w-full">
                {input?.input && (
                  <input
                    type={input?.inputType}
                    name={input?.label}
                    defaultValue={input?.value}
                    onChange={(e) =>
                      input?.setFunction(e.target.value.toString())
                    }
                    id={input?.label}
                    className="input input-primary w-full"
                  />
                )}
                {input?.textArea && (
                  <textarea
                    rows={5}
                    name={input?.label}
                    defaultValue={input?.value}
                    onChange={(e) =>
                      input?.setFunction(e.target.value.toString())
                    }
                    id={input?.label}
                    className="bg-primary w-full p-4"
                  />
                )}
                {input?.customInput && input?.customInput}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            name="Submit"
            value="Submit"
            className="w-full mx-auto flex mt-2 transition duration-400 ease-in btn btn-neutral hover:btn-gradient-two buttontext text-neutral-content"
          >
            {goals ? 'Update Goal' : 'Add Goal'}
          </button>
        </div>
      </form>
    </div>
  );
}
