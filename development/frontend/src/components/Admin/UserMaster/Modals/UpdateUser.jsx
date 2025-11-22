import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import BasicDropDown from "../../../General/BasicDropDown";

const UpdateUser = ({ updateUserRef }) => {
  const [role, setRole] = useState(updateUserRef.current.role);

  useEffect(() => {
    if (role) {
      updateUserRef.current.role = role;
    }
  }, [role]);

  return (
    <div
      style={{
        height: "220px",
        overflow: "auto",
        scrollbarWidth: "thin",
      }}
    >
      <Grid container gap={2}>
        <Grid size={12}>
          <TextField
            label="Name"
            defaultValue={updateUserRef.current.user_name}
            onChange={(e) => (updateUserRef.current.user_name = e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Contact"
            defaultValue={updateUserRef.current.contact}
            onChange={(e) => (updateUserRef.current.contact = e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid size={12}>
          <BasicDropDown
            inputLabel="Select role"
            value={role}
            setValue={setRole}
            menuItems={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "User",
                value: "user",
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default UpdateUser;
