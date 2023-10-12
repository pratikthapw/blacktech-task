/* eslint-disable react/prop-types */
import { useState } from "react";

export default function InputBox({ setSubmitValue, type }) {
  const [inputValue, setInputValue] = useState(null);

  return (
    <form className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="h-12 w-full max-w-screen-md rounded-md bg-slate-300 dark:bg-slate-600">
        <input
          type="text"
          onChange={(e) => setInputValue(() => e.target.value)}
          className="h-full w-full rounded-md bg-transparent px-4 text-lg text-slate-800 outline-none focus:outline-2 focus:outline-green-500 dark:text-slate-100"
          placeholder="Search"
        />
      </div>

      <button
        className="text-md rounded-md bg-green-600 px-6 py-3 font-bold tracking-wider hover:bg-green-500"
        onClick={(e) => {
          e.preventDefault();
          setSubmitValue(() => inputValue);
        }}
      >
        Search
      </button>
    </form>
  );
}
