import axios from "axios";

export const imageUpload = async (image) => {
  const imageFormData = new FormData();
  imageFormData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
    imageFormData
    );
    // console.log(data);
  return data?.data?.display_url;
};