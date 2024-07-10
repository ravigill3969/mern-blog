import axios from "axios";

export const UseUpdate = async (postId, userId, data) => {
  await axios.put(
    `http://127.0.0.1:3000/api/post/updatepost/${postId}/${userId}`,
    data,
    {
      withCredentials: true,
    }
  );
};
