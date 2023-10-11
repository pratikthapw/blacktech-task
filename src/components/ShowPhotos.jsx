import { useInfiniteQuery } from "@tanstack/react-query";
import { getImages } from "../services/getApi";
import InputBox from "./InputBox";
import { useState } from "react";

export default function ShowPhotos() {
  const [submitValue, setSubmitValue] = useState("restaurant");
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["photos", submitValue],
      queryFn: ({ pageParam = 1 }) => getImages(submitValue, pageParam),
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return nextPage;
      },
      select: (data) => {
        const images = data?.pages
          .map((res) => res?.response?.results.map((item) => item?.urls.small))
          .flat(5);
        return images;
      },
    });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <InputBox setSubmitValue={setSubmitValue} />
      {data?.map((image, i) => (
        <img key={i} src={image} className="h-48 w-48" />
      ))}
      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}
