import { createClient } from "@supabase/supabase-js";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "RcW0Oo8z75hmn84JuLe57XSXOWjeDFpiMqsEMxJ88PQ",
});

const supabaseUrl = "https://mjzbcimgxzvjsdtvhmka.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qemJjaW1neHp2anNkdHZobWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5NTE3MjgsImV4cCI6MjAxMjUyNzcyOH0.vvvNVxJNMd6Fc11YNz7NkwS-AAlT82bQaZwiLnYUp5o";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getImages(submitValue, pageParam) {
  try {
    const result = await api.search.getPhotos({
      query: submitValue,
      perPage: 10,
      page: pageParam,
    });
    return result;
  } catch (error) {
    console.log("something went wrong!");
  }
}

export async function getAppointments() {
  let { data: appoints, error } = await supabase.from("appoints").select("*");
  if (error) {
    console.error(error);
    throw new Error("Appointments not found");
  }
  return appoints;
}

export async function addAppointment(newAppoint) {
  const { data, error } = await supabase
    .from("appoints")
    .insert([newAppoint])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Appointments cannot be created");
  }
  return data;
}

export async function updateAppointment([id, obj]) {
  const { data, error } = await supabase
    .from("appoints")
    .update(obj)
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Appointments cannot be created");
  }
  return data;
}

export async function deleteAppointment(id) {
  const { error } = await supabase.from("appoints").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Appointment cannot be deleted");
  }
}
