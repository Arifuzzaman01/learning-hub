import axios from "axios";

/**
 * Upload an image to imgbb service
 * 
 * This utility function uploads an image file to the imgbb image hosting service
 * and returns the URL of the uploaded image.
 * 
 * @param {File} image - The image file to upload
 * @returns {Promise<string>} The URL of the uploaded image
 * @throws {Error} If the upload fails
 */
export const imageUpload = async (image) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
      imageFormData
    );
    return data?.data?.display_url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};