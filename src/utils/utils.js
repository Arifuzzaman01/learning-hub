import axios from "axios";

export const saveUserInDB = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_base_url}/users`,
    user
  );
};
