import axios from "axios";

export const getPosts=async(URL)=>{
  try {
    const {data}= await axios.get(URL);
    return data;
  } catch (error) {
    console.log("error in fetching data")
  }
}

export const getPost=async(id)=>{
  try {
    const {data}=await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    return data;
  } catch (error) {
    console.log(error)
  }
}