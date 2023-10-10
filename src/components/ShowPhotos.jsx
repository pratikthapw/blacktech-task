import { useQuery } from "@tanstack/react-query";
import { getImages } from "../services/getApi";
import InputBox from "./InputBox";
import { useState } from "react";

export default function ShowPhotos() {
  const [submitValue, setSubmitValue] = useState("cat");
  const { data, isLoading } = useQuery({
    queryKey: ["photos", submitValue],
    queryFn: () => getImages(submitValue),
    select: (data) => {
      const images = data?.response?.results.map((item) => item.urls.small);
      return images;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <InputBox setSubmitValue={setSubmitValue} />
      {data?.map((image) => (
        <img key={image} src={image} />
      ))}
    </div>
  );
}
