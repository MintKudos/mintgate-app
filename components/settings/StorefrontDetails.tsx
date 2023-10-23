import React, { useEffect } from 'react';
import TriggerWallet from 'components/utility/TriggerWallet';
import { ImageUploadElement } from 'components/utility/ImgUploadElement';
import Input from 'mintflow/Input';
import { useOvermind } from 'stores/Overmind';

export default function StorefrontDetails({
  email,
  setEmail,
  SaveButtons,
  setEmailOpt,
  emailOpt,
}) {
  const { state: ostate } = useOvermind();

  const OptIn = (
    <div className="mt-6 flex flex-row items-center">
      <input
        type="checkbox"
        id="emailOpt"
        name="emailOpt"
        defaultChecked={emailOpt}
        onChange={() => setEmailOpt(!emailOpt)}
        className="checkbox checkbox-primary flex"
      ></input>
      <label htmlFor="name" className="body2 text-base-content ml-2">
        Yes, allow to receive periodic product updates!
      </label>
    </div>
  );

  const inputFields = [
    {
      label: 'Account Email',
      optional: false,
      setFunction: setEmail,
      value: email,
      placholder: 'hello@gmail.com',
      input: true,
      extra: OptIn,
    },
  ];

  return (
    <div className="w-full">
      <div className="items-start w-full pt-4 pb-8 rounded-box">
        <div className="grid grid-cols-4 gap-8">
          {inputFields
            .filter((x) => ostate.user.creator || !x.optional)
            .map((input) => (
              <div
                key={input?.label}
                className={`col-span-4 lg:col-span-2`}
              >
                <div className="w-full">

                  {input?.input && (
                    <Input
                      label={input?.label}
                      id={input?.label}
                      key={input?.label}
                      name={input?.label}
                      variant="primary"
                      value={input?.value || ''}
                      onChange={(e) => input.setFunction(e.target.value)}
                      placeholder={
                        input?.value ? input?.value : input?.placholder
                      }
                      title={input?.label}
                      className={`w-full`}
                    />
                  )}
                </div>
                {input?.extra && input?.extra}
              </div>
            ))}
        </div>
      </div>
      <SaveButtons />
    </div>
  );
}
