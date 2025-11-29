import { useMutation, useQuery } from "react-query";
import { axiosInstance as axios } from "../utils/axiosInstance";

export const useGetCustomers = (page, pageSize, filter) => {
  return useQuery({
    queryKey: ["customers", page, pageSize, filter],
    queryFn: () =>
      axios
        .get(
          `/customers/getcustomers/${page}/${pageSize}${
            filter ? "/" + filter : ""
          }`
        )
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationKey: "createCustomer",
    mutationFn: (createCustomer) =>
      axios
        .post(`/customers/createcustomer`, createCustomer)
        .then((res) => res.data),
  });
};

export const useUpdateCustomer = () => {
  return useMutation({
    mutationKey: "updateCustomer",
    mutationFn: (updateCustomer) =>
      axios
        .post(`/customers/updatecustomer`, updateCustomer)
        .then((res) => res.data),
  });
};

export const useDeleteCustomer = () => {
  return useMutation({
    mutationKey: "deleteCustomer",
    mutationFn: (customerId) =>
      axios
        .delete(`/customers/deletecustomer/${customerId}`)
        .then((res) => res),
  });
};

export const useAssignCustomer = () => {
  return useMutation({
    mutationKey: "assignCustomer",
    mutationFn: (assignCustomer) =>
      axios
        .post(`/customers/assigncustomer`, assignCustomer)
        .then((res) => res.data),
  });
};

export const useUploadCustomerImages = (customerId) => {
  return useMutation({
    mutationKey: "uploadCustomerImages",
    mutationFn: (imageData) =>
      axios
        .post(`/customers/uploadimages/${customerId}`, imageData)
        .then((res) => res.data),
  });
};

export const useGetCustomerImages = (customerId) => {
  console.log("customerId", customerId);
  return useQuery({
    queryKey: "getCustomerImages",
    queryFn: () =>
      axios
        .get(`/customers/getcustomerimages/${customerId}`)
        .then((res) => res.data),
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
