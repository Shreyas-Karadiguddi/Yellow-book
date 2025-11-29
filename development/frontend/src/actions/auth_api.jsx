import { useMutation } from "react-query";
import { axiosInstance as axios } from "../utils/axiosInstance";

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["LoginUser"],
    mutationFn: ({ userName, password }) =>
      axios
        .post(`/users/login`, {
          userName,
          password,
        })
        .then((response) => response.data),
  });
};
