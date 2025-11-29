import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";
import {
  Dashboard as DashBoardIcon,
  Group,
  SupportAgent,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import DashBoard from "../Admin/Dashboard/Dashboard";
import Settings from "../Admin/Settings/Settings";
import UserMaster from "../Admin/UserMaster/UserMaster";
import CustomerMaster from "../Admin/CustomerMaster/CustomerMaster";
import Login from "../Login/Login";
import DrawerComponent from "./Drawer";
import { decodeToken } from "../../utils/auth";

const COMPONENTS = {
  admin: [
    {
      component: DashBoard,
      name: "Dashboard",
      icon: <DashBoardIcon />,
      path: "/dashboard",
    },
    {
      component: UserMaster,
      name: "User Master",
      icon: <Group />,
      path: "/users",
    },
    {
      component: CustomerMaster,
      name: "Customer Master",
      icon: <SupportAgent />,
      path: "/customers",
    },
    {
      component: Settings,
      name: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ],
};

const AuthRouters = ({ routes }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {routes?.length > 0 &&
        routes.map((route) => {
          const Component = route.component;
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
    </Routes>
  );
};

const AuthProvider = () => {
  const token = localStorage.getItem("token");

  const routes = useMemo(() => {
    if (token) {
      const role = decodeToken(token);
      return COMPONENTS[role.role];
    }
  }, [token]);

  if (!token || location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <DrawerComponent routes={routes} />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4ebfa",
          p: 2,
        }}
      >
        <Toolbar />
        <AuthRouters routes={routes} token={token} />
      </Box>
    </>
  );
};
export default AuthProvider;
