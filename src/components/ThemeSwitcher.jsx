import { useState } from "react";
// import useDarkSide from "./Hook/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "../Hooks/useDarkMode";

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false,
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div>
        <DarkModeSwitch
          checked={darkSide}
          onChange={toggleDarkMode}
          size={24}
        />
      </div>
    </>
  );
}
