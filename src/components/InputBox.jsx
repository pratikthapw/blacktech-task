/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import SortBy from "./SortBy";
import { addInputAppoint, addInputPhoto } from "./inputSlice";
import { useState } from "react";

export default function InputBox({ type = "search" }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(event) {
    if (type === "sortBy") {
      dispatch(addInputAppoint(event.target.value));
    }
    setInputValue(() => event.target.value);
  }

  function handleBtnClick(event) {
    event.preventDefault();
    if (type === "search" && inputValue) {
      dispatch(addInputPhoto(inputValue));
    }
  }

  return (
    <form className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="h-12 w-full max-w-screen-md rounded-md bg-slate-300 dark:bg-slate-600">
        <input
          type="text"
          onChange={(e) => handleInputChange(e)}
          className="h-full w-full rounded-md bg-transparent px-4 text-lg text-slate-800 outline-none focus:outline-2 focus:outline-green-500 dark:text-slate-100"
          placeholder="Search"
        />
      </div>
      {type === "search" ? (
        <button
          className="text-md self-stretch rounded-md bg-green-600 px-6 py-3 font-bold tracking-wider hover:bg-green-500"
          onClick={(e) => handleBtnClick(e)}
        >
          Search
        </button>
      ) : (
        <SortBy />
      )}
    </form>
  );
}
