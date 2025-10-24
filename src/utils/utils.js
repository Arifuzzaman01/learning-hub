import axios from "axios";

/**
 * Save user information to the database
 * 
 * This utility function saves user information to the backend database
 * after successful authentication.
 * 
 * @param {Object} user - User information to save
 * @param {string} user.email - User's email address
 * @param {string} user.name - User's full name
 * @param {string} user.imageURL - URL of user's profile image
 * @param {string} user.role - User's role (student, tutor, admin)
 * @returns {Promise<Object>} Response data from the API
 */
export const saveUserInDB = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_base_url}/users`,
    user
  );
  return data;
};