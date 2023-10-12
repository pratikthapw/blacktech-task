import { createClient } from "@supabase/supabase-js";
import { createApi } from "unsplash-js";

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const api = createApi({
  accessKey: UNSPLASH_API_KEY,
});

const supabaseUrl = "https://mjzbcimgxzvjsdtvhmka.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
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
