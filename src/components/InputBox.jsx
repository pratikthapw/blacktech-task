import { useState } from "react";

export default function InputBox({ setSubmitValue }) {
  const [inputValue, setInputValue] = useState(null);

  return (
    <form className="mb-4 flex items-center gap-x-4">
      <input
        type="text"
        onChange={(e) => setInputValue(() => e.target.value)}
        className="text-black"
      />
      <button
        className=""
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
