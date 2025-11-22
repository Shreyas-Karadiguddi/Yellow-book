import { WarningAmber } from "@mui/icons-material";

const DeleteUser = ({ deleteUserRef }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff3f3",
        padding: "15px",
      }}
    >
      <WarningAmber style={{ fontSize: 80, color: "#d32f2f" }} />

      <h2 style={{ color: "#d32f2f", margin: "15px 0 5px" }}>
        Delete Customer
      </h2>
      <p style={{ color: "#555", textAlign: "center", maxWidth: "400px" }}>
        Are you sure you want to delete{" "}
        <strong> {deleteUserRef.current.userName}</strong> this user? This
        action is
        <strong> permanent</strong> and cannot be undone.
      </p>
    </div>
  );
};

export default DeleteUser;
