import { useInfiniteQuery } from "@tanstack/react-query";
import { getImages } from "../services/getApi";

export default function useUnsplashImg(submitValue) {
  const {
    data: imgData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["photos", submitValue],
    queryFn: ({ pageParam = 1 }) => getImages(submitValue, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage;
    },
    select: (data) => {
      const images = data?.pages
        .map((res) =>
          res?.response?.results.map((item) => {
            return {
              id: item?.id,
              img: item?.urls.regular,
              likes: item?.likes,
              downloadImg: item?.links.download,
            };
          }),
        )
        .flat(5);
      return images;
    },
  });
  return { imgData, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage };
}
