/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addInputValue } from "./inputSlice";
import SortBy from "./SortBy";

export default function InputBox({ setSubmitValue, type = "search" }) {
  const { inputValue } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <form className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="h-12 w-full max-w-screen-md rounded-md bg-slate-300 dark:bg-slate-600">
        <input
          type="text"
          onChange={(e) => dispatch(addInputValue(e.target.value))}
          className="h-full w-full rounded-md bg-transparent px-4 text-lg text-slate-800 outline-none focus:outline-2 focus:outline-green-500 dark:text-slate-100"
          placeholder="Search"
        />
      </div>
      {type === "search" ? (
        <button
          className="text-md self-stretch rounded-md bg-green-600 px-6 py-3 font-bold tracking-wider hover:bg-green-500"
          onClick={(e) => {
            e.preventDefault();
            setSubmitValue(() => inputValue);
          }}
        >
          Search
        </button>
      ) : (
        <SortBy />
        // <button className="text-md self-stretch rounded-md bg-green-600 px-6 py-3 font-bold tracking-wider hover:bg-green-500">
        //   Sort_By
        // </button>
      )}
    </form>
  );
}
