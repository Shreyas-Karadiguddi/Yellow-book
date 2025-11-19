import React, { useMemo, useState } from "react";
import { Menu } from "@mui/icons-material";
import {
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  ListItemButton,
  List,
  Drawer,
  Box,
  Divider,
  ListItemIcon,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const DrawerComponent = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const activeTab = useMemo(() => {
    if (routes) {
      return routes.find((item) => item.path === location.pathname);
    }
  }, [routes, location.pathname]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 220,
        height: "100%",
        bgcolor: "#f4ebfa",
        color: "#333",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {routes?.length > 0 &&
          routes.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <React.Fragment key={item.path}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      bgcolor: isActive ? "#8e70cf" : "transparent",
                      color: isActive ? "#8e70cf" : "inherit",
                      "&:hover": {
                        bgcolor: "#b398ed",
                        color: "white",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: "black",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      style={{ textColor: "white" }}
                      primaryTypographyProps={{
                        fontWeight: isActive ? "bold" : "normal",
                        color: isActive ? "white" : "inherit",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{ zIndex: 1, backgroundColor: "#8e70cf" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Menu style={{ color: "white" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center", color: "white" }}
          >
            {activeTab?.name || "Yellow Book"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default DrawerComponent;
