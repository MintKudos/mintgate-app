import React from 'react';

export default function DropdownFormLayout({
  displayInfo,
  handleSubmit,
  handleInputChange,
  customInput,
}) {
  return (
    <>
      <form>
        {customInput.map((item, i) => {
          return (
            <div key={i} className="w-full">
              <p className="caption-small tracking-wider text-base-content my-2">
                {item.message}
              </p>
              <input
                type={item.type}
                name={item.name}
                defaultValue={item.defaultValue}
                onChange={(e) => handleInputChange(e)}
                placeholder={item.placeholder}
                className="input input-bordered input-primary text-sm px-4 w-full"
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => handleSubmit()}
          name="Submit"
          value="Submit"
          className="w-1/2 flex mt-4 transition duration-400 ease-in btn btn-neutral hover:btn-gradient-two buttontext text-neutral-content"
        >
          Submit
        </button>

        {displayInfo || null}
      </form>
    </>
  );
}
