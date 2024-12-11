import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Avatar,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Link from "next/link";
import { useUserStore } from "@/toolkit/store/store";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { FaEarlybirds } from "react-icons/fa";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { token, setToken, user, setUser } = useUserStore();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setToken("");
    localStorage.removeItem("user");
    setUser();
    toast.success("Logout Successfully");
    router.push("/auth/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure Header is above SideNav
        backgroundColor: "#f5f5f5",
        color: "black",
      }}
    >
      <Toolbar>
        {/* Left Section: Logo */}
        <Box display="flex" alignItems="center">
          <Link href="/" style={{ textDecoration: "none" }}>
          <IconButton size="large" edge="start" color="inherit">
            <FaEarlybirds />
          </IconButton>
          </Link>
        </Box>

        {/* Middle Section: Spacer */}
        <Box sx={{ flexGrow: 1 }} />

          {/* Right Section: Profile Picture and Name */}
          {!isMobile && token && user && (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={user?.photo}
                alt={user?.name}
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="body1" color="inherit">
                Welcome {user?.name}
              </Typography>
            </Box>
          )}

          {/* Login/Logout Buttons */}
          <Box display="flex" alignItems="center" gap={2}>
            {!token ? (
              <Link
                href="/auth/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button variant="outlined" color="primary">
                  Login
                </Button>
              </Link>
            ) : (
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
