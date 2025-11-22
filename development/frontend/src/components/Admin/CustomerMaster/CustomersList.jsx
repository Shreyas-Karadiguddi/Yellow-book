import React, { memo } from "react";
import { TableRow, TableCell, IconButton, Box } from "@mui/material";
import { Delete, Info, Edit, Group, CameraAlt } from "@mui/icons-material";
import { Colors } from "../../General/Colors";

const CustomerList = ({
  item,
  setIsOpenModal,
  setModalAction,
  uploadImagesRef,
  deleteCustomerRef,
  createCustomerRef,
  assignCustomerRef,
}) => {
  return (
    <TableRow hover>
      <TableCell sx={{ padding: "8px" }}>{item.customer_name}</TableCell>
      <TableCell sx={{ padding: "4px", textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            alignItems: "center",
            p: 0,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
            onClick={() => {
              createCustomerRef.current = {
                ...createCustomerRef.current,
                id: item.id,
                user_id: item.user_id,
                customer_name: item.customer_name,
                customer_address: item.customer_address,
                customer_area: item.customer_area,
                customer_city: item.customer_city,
                customer_state: item.customer_state,
                pincode: item.pincode,
                email: item.email,
                contact_no: item.contact_no,
                pending_amount: item.pending_amount,
                gst: item.gst,
                whatsapp_no: item.whatsapp_no,
                alternate_no: item.alternate_no,
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
          >
            <Info
              sx={{ color: Colors.orange.dark }}
              onClick={() => {
                createCustomerRef.current = {
                  ...createCustomerRef.current,
                  id: item.id,
                  user_id: item.user_id,
                  customer_name: item.customer_name,
                  customer_address: item.customer_address,
                  customer_area: item.customer_area,
                  customer_city: item.customer_city,
                  customer_state: item.customer_state,
                  pincode: item.pincode,
                  email: item.email,
                  contact_no: item.contact_no,
                  pending_amount: item.pending_amount,
                  gst: item.gst,
                  whatsapp_no: item.whatsapp_no,
                  alternate_no: item.alternate_no,
                };
                setModalAction("Info");
                setIsOpenModal(true);
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <CameraAlt
              sx={{ color: "grey" }}
              onClick={() => {
                setModalAction("Upload");
                setIsOpenModal(true);
                uploadImagesRef.current.customer_id = item.id;
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <Delete
              sx={{ color: Colors.red.dark }}
              onClick={() => {
                deleteCustomerRef.current.customer_id = item.id;
                deleteCustomerRef.current.customer_name = item.customer_name;
                setModalAction("Delete");
                setIsOpenModal(true);
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "#F3F4F6",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <Group
              sx={{ color: Colors.green.dark }}
              onClick={() => {
                assignCustomerRef.current.customer_id = item.id;
                assignCustomerRef.current.user_id = item.user_id;
                setModalAction("Assign");
                setIsOpenModal(true);
              }}
            />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default memo(CustomerList, (prev, next) => {
  return JSON.stringify(prev.item) === JSON.stringify(next.item);
});
