import { useMutation, useQuery } from "react-query";
import { axiosInstance as axios } from "../../utils/AxiosInstance";

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

export const useGetRoutes = () => {
  return useQuery({
    queryKey: ["GetRoutes"],
    queryFn: () =>
      axios
        .get(`/users/getroutes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => response.data),
    refetchOnWindowFocus: false,
    enabled: !!localStorage.getItem("token"),
  });
};
