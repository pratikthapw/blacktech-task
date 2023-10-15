/* eslint-disable react/prop-types */
import InputBox from "./InputBox";
import useUnsplashImg from "../Hooks/useUnsplashImg";
import { AiFillHeart } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

export default function ShowPhotos() {
  const { inputValuePhoto: submitValue } = useSelector((state) => state.search);
  const { imgData, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useUnsplashImg(submitValue);

  return (
    <div className="flex flex-col justify-center gap-y-8">
      <InputBox type={"search"} />
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="dark:text h-72 w-72" />
            ))
          : imgData?.map((image) => (
              <ImgCompLayout
                key={image.id}
                image={image}
                isLoading={isLoading}
              />
            ))}
      </div>

      <button
        disabled={!hasNextPage || isFetchingNextPage || isLoading}
        onClick={() => fetchNextPage()}
        className="self-center rounded-lg bg-purple-400 px-4 py-2 text-center font-bold"
      >
        {isFetchingNextPage || isLoading
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}

function ImgCompLayout({ image }) {
  return (
    <div className="flex flex-col items-center gap-y-4 rounded-lg bg-slate-300 p-8 dark:bg-slate-600">
      <img
        key={image.id}
        src={image?.img}
        className="h-72 w-full rounded-md object-cover"
      />
      <div className="flex w-full items-center justify-between">
        <p className="flex items-center gap-x-1 text-2xl text-red-400">
          <AiFillHeart />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-100 ">
            {image.likes}
          </span>
        </p>
        <a
          href={`${image.downloadImg}?force=true`}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer rounded-xl bg-green-100/20 px-4 py-2 font-bold hover:bg-green-500"
          download
        >
          Download
        </a>
      </div>
    </div>
  );
}
