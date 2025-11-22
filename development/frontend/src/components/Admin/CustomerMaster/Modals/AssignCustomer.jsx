import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Person } from "@mui/icons-material";
import BasicDropDown from "../../../General/BasicDropDown";
import * as userActions from "../../../../actions/users_api";

const AssignCustomer = ({ assignCustomerRef }) => {
  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [users, setUsers] = useState([]);

  const { data: isUsers, refetch: refetchUsers } = userActions.useGetAllUsers();

  useEffect(() => {
    refetchUsers();
  }, []);

  useEffect(() => {
    if (newUserName) {
      assignCustomerRef.current.user_id = newUserName;
    }
  }, [newUserName]);

  useEffect(() => {
    if (isUsers) {
      setUserName(
        isUsers.find((item) => item.id === assignCustomerRef.current.user_id)
          ?.user_name
      );
      setUsers(
        isUsers.map((item) => {
          return {
            label: item.user_name,
            value: item.id,
          };
        })
      );
    }
  }, [isUsers]);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{ fontSize: "16px", color: "#333" }}
      gap={3}
    >
      <Grid item>
        <Person color="primary" sx={{ verticalAlign: "middle", mr: 1 }} />
        <b style={{ display: "inline-block", width: "120px" }}>Assigned To:</b>
        {userName || "Not assigned yet"}
      </Grid>
      <BasicDropDown
        inputLabel="Select new assignee"
        value={newUserName}
        setValue={setNewUserName}
        menuItems={users}
      />
    </Grid>
  );
};
export default AssignCustomer;
