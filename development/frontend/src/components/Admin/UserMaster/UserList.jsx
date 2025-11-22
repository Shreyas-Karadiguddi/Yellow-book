import React, { memo } from "react";
import { TableRow, TableCell, IconButton, Box } from "@mui/material";
import { LockReset, Edit, Delete } from "@mui/icons-material";
import { Colors } from "../../General/Colors";

const UserList = ({
  item,
  setModalAction,
  setIsOpenModal,
  updateUserRef,
  resetPasswordRef,
  deleteUserRef,
}) => {
  return (
    <TableRow hover>
      <TableCell sx={{ padding: "8px" }}>{item.user_name}</TableCell>
      <TableCell sx={{ padding: "4px", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              p: 1,
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
            onClick={() => {
              updateUserRef.current = {
                ...updateUserRef.current,
                id: item.id,
                user_name: item.user_name,
                role: item.role,
                contact: item.contact_info,
              };
              setModalAction("Edit");
              setIsOpenModal(true);
            }}
          >
            <Edit sx={{ color: "#45278D" }} />
          </IconButton>

          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
            onClick={() => {
              deleteUserRef.current = {
                ...deleteUserRef.current,
                id: item.id,
                userName: item.user_name,
              };
              setModalAction("Delete");
              setIsOpenModal(true);
            }}
          >
            <Delete sx={{ color: Colors.red.dark }} />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              p: 1,
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
            onClick={() => {
              resetPasswordRef.current = {
                ...resetPasswordRef.current,
                id: item.id,
              };
              setModalAction("ResetPassword");
              setIsOpenModal(true);
            }}
          >
            <LockReset sx={{ color: Colors.orange.dark }} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default memo(UserList, (prev, next) => {
  return JSON.stringify(prev.item) === JSON.stringify(next.item);
});
