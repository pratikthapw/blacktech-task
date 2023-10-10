import { Link } from "react-router-dom";
import Page404Img from "../images/404Page.png";

function Page404() {
  return (
    <>
      <div className="mt-5 flex max-w-screen-xl items-center">
        <div className="container flex flex-col items-center justify-between px-5 md:flex-row">
          <div className="mx-8 w-full lg:w-1/2">
            <div className="font-dark mb-8 text-7xl font-extrabold text-green-500">
              404 Error
            </div>
            <p className="mb-8 text-2xl font-light leading-normal md:text-3xl">
              Sorry we couldn&apos;t find the page you&apos;re looking for
            </p>

            <Link
              to="/"
              className="duration-400 inline rounded-lg border border-transparent bg-green-600 px-5 py-3 text-sm font-medium leading-5 text-white shadow-2xl transition-all hover:bg-red-700 focus:outline-none active:bg-red-600"
            >
              back to homepage
            </Link>
          </div>
          <div className="mx-5 my-12 w-full lg:flex lg:w-1/2 lg:justify-end">
            <img
              src={Page404Img}
              className="dark:mix-blend-color-dodge"
              alt="Page not found"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page404;
