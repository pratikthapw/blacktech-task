import { NavLink } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Nav() {
  return (
    <>
      <nav className="flex w-full items-center justify-between px-6 py-4 shadow-xl">
        <ul className="flex w-9/12 items-center justify-between sm:w-5/12 lg:w-3/12">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-bold ${
                  isActive ? "text-green-600 dark:text-green-400" : ""
                }`
              }
            >
              Appointment
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/photo-library"
              className={({ isActive }) =>
                `font-bold ${
                  isActive ? "text-green-600 dark:text-green-400" : ""
                }`
              }
            >
              Photo-Library
            </NavLink>
          </li>
        </ul>
        <div className="">
          <ThemeSwitcher />
        </div>
      </nav>
    </>
  );
}
