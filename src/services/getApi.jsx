import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "RcW0Oo8z75hmn84JuLe57XSXOWjeDFpiMqsEMxJ88PQ",
});

export async function getImages(submitValue) {
  try {
    const result = await api.search.getPhotos({
      query: submitValue,
      perPage: 10,
      page: 1,
    });
    return result;
  } catch (error) {
    console.log("something went wrong!");
  }
}
