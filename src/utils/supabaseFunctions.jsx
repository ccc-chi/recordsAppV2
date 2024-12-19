import { supabase } from "./supabase";
export const getAllRecords = async () => {
  const { data, error } = await supabase.from("study-record").select("*");
  console.log("Headers:", supabase.headers);
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Data:", data);
  }
  // if (error) {
  //   console.log(error);
  // }

  return data;
};
