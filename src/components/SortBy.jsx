import { useState } from "react";

export default function SortBy() {
  const [openDropdown, setOpenDropdown] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    setOpenDropdown((v) => !v);
  }
  return (
    <>
      <div className="relative self-stretch rounded-md bg-green-600 hover:bg-green-500">
        <button
          onClick={handleClick}
          className="text-md w-full px-6 py-3 text-center font-bold tracking-wider "
        >
          Sort_By⤸
        </button>
        {openDropdown ? (
          <div className="absolute top-[110%] w-full rounded-md bg-slate-300 shadow-lg dark:bg-slate-700 sm:left-[-30%]">
            <ul className="">
              <li className="cursor-pointer px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600">
                Pet Name
              </li>
              <li className="cursor-pointer px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600">
                Owner Name
              </li>
              <li className="cursor-pointer px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600">
                Date
              </li>
            </ul>
            <hr />
            <ul className="">
              <li className="cursor-pointer px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600">
                Asc
              </li>
              <li className="cursor-pointer px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600">
                Desc
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
