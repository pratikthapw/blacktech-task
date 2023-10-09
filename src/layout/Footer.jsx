import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex max-w-screen-xl flex-col-reverse items-center gap-y-3 px-6 py-4 sm:flex-row sm:justify-between">
      <p className=" text-center text-sm">
        {new Date().getFullYear()} &copy; Copyright BlackTech_Task ||
        <br className="sm:hidden" /> All Rights Reserved
      </p>
      <div className="flex items-center gap-x-4  text-sm">
        <Link to="/">Appointment</Link>
        <Link to="/photo-Library">Photo-Library</Link>
      </div>
    </footer>
  );
}

export default Footer;
