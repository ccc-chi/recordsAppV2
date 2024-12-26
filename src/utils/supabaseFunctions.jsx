import { supabase } from "./supabase";
export const getAllRecords = async () => {
  const { data, error } = await supabase.from("study-record").select("*");
  if (error) {
    console.error("Error:", error.message);
  }
  return data;
};

export const addRecords = async (title, time) => {
  const { data, error } = await supabase
    .from("study-record")
    .insert({ title: title, time: time });
  if (error) {
    console.error("Error:", error.message);
  }
  return data;
};
