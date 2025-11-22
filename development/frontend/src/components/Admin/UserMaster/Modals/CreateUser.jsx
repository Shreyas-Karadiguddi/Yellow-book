import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import BasicDropDown from "../../../General/BasicDropDown";

const CreateUser = ({ createUserRef }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (role) {
      createUserRef.current.role = role;
    }
  }, [role]);

  return (
    <div style={{ height: "280px", overflow: "auto", scrollbarWidth: "thin" }}>
      <Grid container gap={2}>
        <Grid size={12}>
          <TextField
            label="Name"
            defaultValue={createUserRef.current.user_name}
            onChange={(e) => (createUserRef.current.user_name = e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Password"
            defaultValue={createUserRef.current.password}
            onChange={(e) => (createUserRef.current.password = e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <TextField
            label="Contact"
            defaultValue={createUserRef.current.contact}
            onChange={(e) => (createUserRef.current.contact = e.target.value)}
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
export default CreateUser;
