import { useQuery, useMutation } from "react-query";
import { axiosInstance as axios } from "../utils/axiosInstance";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GetAllUsers"],
    queryFn: () =>
      axios.get(`/users/getusers`).then((response) => response.data),
    refetchOnWindowFocus: false,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ["CreateUser"],
    mutationFn: (newUser) =>
      axios.post(`/users/createuser`, newUser).then((res) => res.data),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["UpdateUser"],
    mutationFn: (updateUser) =>
      axios.post(`/users/updateuser`, updateUser).then((res) => res.data),
  });
};

export const resetPasswordByAdmin = () => {
  return useMutation({
    mutationKey: ["ResetPasswordByAdmin"],
    mutationFn: (resetPassword) =>
      axios
        .post(`/users/resetpassword/admin`, resetPassword)
        .then((res) => res.data),
  });
};

export const useGetUserInfo = (userId) => {
  return useQuery({
    queryKey: ["GetUserInfo"],
    queryFn: () =>
      axios
        .get(`/users/getuserinfo/${userId}`)
        .then((response) => response.data),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: "delete user",
    mutationFn: (userId) =>
      axios.delete(`/users/deleteuser/${userId}`).then((res) => res.data),
  });
};
