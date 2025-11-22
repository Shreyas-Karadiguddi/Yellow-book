import React, { useCallback, useEffect, useRef, useState } from "react";
import UserHeader from "./UserHeader";
import UserModals from "./UserModals";
import * as userActions from "../../../actions/users_api";
import BaseTable from "../../General/BaseTable";
import { Notification } from "../../General/Notification";
import UserList from "./UserList";

const columns = [
  { key: "name", label: "Name", width: "70%", align: "left" },
  { key: "actions", label: "Actions", align: "center" },
];

export const CREATE_USER = {
  user_name: "",
  password: "",
  role: "",
  contact: "",
};
export const UPDATE_USER = { id: null, user_name: "", role: "", contact: "" };
export const RESET_PASSWORD = {
  id: null,
  newPassword: "",
  confirmPassword: "",
};
const DELETE_USER = {
  id: "",
  userName: "",
};

const UserMaster = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [filter, setFilter] = useState("");
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createUserRef = useRef(CREATE_USER);
  const updateUserRef = useRef(UPDATE_USER);
  const resetPasswordRef = useRef(RESET_PASSWORD);
  const deleteUserRef = useRef(DELETE_USER);

  const { data: isUserData, refetch: refetchUsers } =
    userActions.useGetAllUsers();

  const { status: isUserCreated, mutate: createUser } =
    userActions.useCreateUser();

  const { status: isUserResetPassword, mutate: resetPassword } =
    userActions.resetPasswordByAdmin();

  const { status: isUpdateUser, mutate: updateUser } =
    userActions.useUpdateUser();

  const { status: isUserDeleted, mutate: deleteUser } =
    userActions.useDeleteUser();

  useEffect(() => {
    refetchUsers();
  }, []);

  useEffect(() => {
    if (isUserData) setUserList(isUserData);
  }, [isUserData]);

  useEffect(() => {
    if (isUserCreated) {
      if (isUserCreated === "success") {
        refetchUsers();
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "success", title: "User created successfully!" });
        createUserRef.current = { ...CREATE_USER };
      } else if (isUserCreated === "error") {
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "error", title: "Failed to create user!" });
      }
    }
  }, [isUserCreated]);

  useEffect(() => {
    if (isUpdateUser) {
      if (isUpdateUser === "success") {
        refetchUsers();
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "success", title: "User updated successfully!" });
      } else if (isUpdateUser === "error") {
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "error", title: "Failed to update user!" });
      }
    }
  }, [isUpdateUser]);

  useEffect(() => {
    if (isUserResetPassword) {
      if (isUserResetPassword === "success") {
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({
          type: "success",
          title: "Password reset successfully!",
        });
      } else if (isUserResetPassword === "error") {
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "success", title: "Failed to reset password!" });
      }
    }
  }, [isUserResetPassword]);

  useEffect(() => {
    if (isUserDeleted) {
      if (isUserDeleted === "success") {
        refetchUsers();
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "success", title: "User delted successfully !" });
      } else if (isUserDeleted === "error") {
        setIsOpenModal(false);
        setIsLoading(false);
        Notification({ type: "success", title: "Failed to delete user !" });
      }
    }
  }, [isUserDeleted]);

  useEffect(() => {
    setIsLoading(true);
    const delay = setTimeout(() => {
      if (filter) {
        setUserList(
          isUserData?.filter((item) =>
            item.user_name.toLowerCase().includes(filter.toLowerCase())
          )
        );
      } else {
        setUserList(isUserData);
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(delay);
  }, [filter, isUserData]);

  const handleActions = useCallback(() => {
    setIsLoading(true);
    switch (modalAction) {
      case "Add":
        createUser(createUserRef.current);
        break;
      case "Edit":
        updateUser(updateUserRef.current);
        break;
      case "Delete":
        deleteUser(deleteUserRef.current.id);
        break;
      case "ResetPassword":
        if (
          resetPasswordRef.current.newPassword !==
          resetPasswordRef.current.confirmPassword
        ) {
          Notification({
            type: "error",
            title: "Make sure to enter the same password in both fields!",
          });
          setIsLoading(false);
          return;
        }
        resetPassword({
          id: resetPasswordRef.current.id,
          new_password: resetPasswordRef.current.newPassword,
        });
        break;
      default:
        break;
    }
  }, [modalAction]);

  return (
    <>
      <UserHeader
        filter={filter}
        setFilter={setFilter}
        setModalAction={setModalAction}
        setIsOpenModal={setIsOpenModal}
      />
      <BaseTable
        columns={columns}
        height={450}
        rows={userList}
        renderRow={({ row, index }) => (
          <UserList
            item={row}
            setModalAction={setModalAction}
            setIsOpenModal={setIsOpenModal}
            updateUserRef={updateUserRef}
            resetPasswordRef={resetPasswordRef}
            deleteUserRef={deleteUserRef}
          />
        )}
        isLoading={isLoading}
      />
      <UserModals
        isLoading={isLoading}
        isOpenModal={isOpenModal}
        modalAction={modalAction}
        setIsOpenModal={setIsOpenModal}
        handleActions={handleActions}
        createUserRef={createUserRef}
        resetPasswordRef={resetPasswordRef}
        updateUserRef={updateUserRef}
        deleteUserRef={deleteUserRef}
      />
    </>
  );
};

export default UserMaster;
