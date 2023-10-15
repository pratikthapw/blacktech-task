import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortByOrder, sortByType } from "./sortSlice";

export default function SortBy() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);
  const dispatch = useDispatch();
  let sortListClass =
    "cursor-pointer px-2 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-600";
  function handleSortBtnClick(e) {
    e.preventDefault();
    setOpenDropdown((v) => !v);
  }

  function handleActiveIndex1(item, index) {
    setActiveIndex1(() => index);
    dispatch(sortByType(item.toLowerCase()));
  }

  function handleActiveIndex2(item, index) {
    setActiveIndex2(() => index);
    dispatch(sortByOrder(item.toLowerCase()));
  }

  return (
    <>
      <div className="relative self-stretch rounded-md bg-green-600 hover:bg-green-500">
        <button
          onClick={handleSortBtnClick}
          className="text-md w-full px-6 py-3 text-center font-bold tracking-wider "
        >
          Sort_By⤸
        </button>
        {openDropdown ? (
          <div className="absolute top-[110%] w-full rounded-md bg-slate-300 shadow-lg dark:bg-slate-700 sm:left-[-30%]">
            <ul className="">
              {["Pet Name", "Owner Name", "Date"].map((item, index) => (
                <li
                  key={index}
                  className={
                    index === activeIndex1
                      ? `${sortListClass} font-bold text-green-600`
                      : sortListClass
                  }
                  onClick={() => handleActiveIndex1(item, index)}
                >
                  {item}
                </li>
              ))}
            </ul>
            <hr />
            <ul className="">
              {["Asc", "Desc"].map((item, index) => (
                <li
                  key={index}
                  className={
                    index === activeIndex2
                      ? `${sortListClass} font-bold text-green-600`
                      : sortListClass
                  }
                  onClick={() => handleActiveIndex2(item, index)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
