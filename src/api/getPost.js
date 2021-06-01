import axios from "axios";

export const getPosts=async(URL)=>{
  try {
    const {data}= await axios.get(URL);
    return data;
  } catch (error) {
    console.log("error in fetching data")
  }
}