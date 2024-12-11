// import React, { useState } from "react";
// import {
//   List,
//   ListItem,
//   Typography,
//   Divider,
//   Paper,
//   Box,
//   Button,
//   Drawer,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import Link from "next/link";

// const SideBar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Determine if the screen size is mobile
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   // Toggle Sidebar Visibility
//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Toggle Button - Only visible in mobile view */}
//       {isMobile && (
//         <Button
//           onClick={toggleSidebar}
//           sx={{
//             position: "fixed",
//             top: 16,
//             left: 16,
//             // zIndex: 1300,
//             backgroundColor: "#1976d2",
//             color: "#fff",
//             "&:hover": {
//               backgroundColor: "#115293",
//             },
//           }}
//           startIcon={<MenuIcon />}
//         >
//           Menu
//         </Button>
//       )}

//       {/* Sidebar Drawer */}
//       <Drawer
//         anchor="left"
//         open={!isMobile || isOpen} // Always open on desktop; toggleable on mobile
//         onClose={toggleSidebar}
//         variant={isMobile ? "temporary" : "permanent"} // Permanent drawer for desktop
//         sx={{
//           zIndex: isMobile ? 1200 : 0, // Adjust z-index for mobile/desktop
//           "& .MuiDrawer-paper": {
//             width: 250,
//             padding: 3,
//             height: "100%",
//             backgroundColor: "#f5f5f5",
//             boxShadow: isMobile ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
//           },
//         }}
//       >
//         {/* Close Button - Only visible in mobile view */}
//         {isMobile && (
//           <Button
//             onClick={toggleSidebar}
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               width: "100%",
//               marginBottom: 2,
//             }}
//           >
//             <CloseIcon />
//           </Button>
//         )}

//         {/* Sidebar Content */}
//         {/* <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
//         >
//           Product Categories
//         </Typography> */}
//         {/* <Divider sx={{ mb: 3, borderColor: "#1976d2" }} /> */}
//         <List>
//           <ListItem
//             component={Link}
//             href="/cms/all-blogs"
//             sx={{
//               borderRadius: 1,
//               transition: "transform 0.2s, box-shadow 0.2s",
//               "&:hover": {
//                 transform: "translateX(10px)",
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                 backgroundColor: "#e3f2fd",
//               },
//               textDecoration: "none",
//               color: "#1976d2",
//             }}
//           >
//             <Typography
//               sx={{
//                 textTransform: "capitalize",
//                 padding: 1,
//                 textAlign: "left",
//                 fontWeight: "bold",
//               }}
//             >
//               All Blogs
//             </Typography>
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default SideBar;


import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  IconButton,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import { ExpandLess, ExpandMore, Menu } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useUserStore } from '@/toolkit/store/store';

const SideBar: React.FC = () => {
  const { token, setToken, user, setUser } = useUserStore()

  useEffect(() => {
    setToken("")
    setUser()
  },[token])
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = (option: string) => {
    setOpen(open === option ? null : option);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List sx={{ overflow: 'hidden'}}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleToggle('Blog')}>
          <ListItemText primary="Blog" />
          {open === 'Blog' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open === 'Blog'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          <ListItem
            component={Link}
            href="/cms/all-blogs"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              All Blogs
            </Typography>
          </ListItem>
          <ListItem
            component={Link}
            href="/cms/blog-categories"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Blog Categories
            </Typography>
          </ListItem>
          <ListItem
            component={Link}
            href="/cms/latest-blogs"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Latest Blogs
            </Typography>
          </ListItem>
        </List>
      </Collapse>
      {/* {/ Add other options (Page Content, Course, CRUD) /} */}

      <ListItem disablePadding>
        <ListItemButton onClick={() => handleToggle('Page Content')}>
          <ListItemText primary="Page Content" />
          {open === 'Page Content' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open === 'Page Content'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          <ListItem
            component={Link}
            href="/cms/services"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              All Services
            </Typography>
          </ListItem>
          <ListItem
            component={Link}
            href="/cms/testimonial"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              All Testimonial
            </Typography>
          </ListItem>
          <ListItem
            component={Link}
            href="/cms/team-members"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
             Team members
            </Typography>
          </ListItem>
        </List>
      </Collapse>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleToggle('Course')}>
          <ListItemText primary="Course" />
          {open === 'Course' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open === 'Course'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
        <ListItem
            component={Link}
            href="/cms/all-courses"
            sx={{
              borderRadius: 1,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateX(10px)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#e3f2fd",
              },
              textDecoration: "none",
              color: "#1976d2",
            }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                padding: 1,
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              All Courses
            </Typography>
          </ListItem>
        </List>
      </Collapse>
      {
        token && (
          <>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle('Crud')}>
              <ListItemText primary="Crud" />
              {open === 'Crud' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={open === 'Crud'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem
                component={Link}
                href="/students/create"
                sx={{
                  borderRadius: 1,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateX(10px)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#e3f2fd",
                  },
                  textDecoration: "none",
                  color: "#1976d2",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    padding: 1,
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  Create Student
                </Typography>
              </ListItem>
              <ListItem
                component={Link}
                href="/students/all-students"
                sx={{
                  borderRadius: 1,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateX(10px)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#e3f2fd",
                  },
                  textDecoration: "none",
                  color: "#1976d2",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    padding: 1,
                    textAlign: "left",
                    fontWeight: "bold",
                  }}
                >
                  All Students
                </Typography>
              </ListItem>
            </List>
          </Collapse>
          </>
        )
      }
    </List>

    
  );


  return (
    <Box>
      {/* {/ Menu button for mobile /} */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ margin: 1 }}
        >
          <Menu />
        </IconButton>
      )}

      {/* {/ Drawer for mobile and desktop /} */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: isMobile ? '50px' : '64px',
            height: isMobile ? '100vh' : 'calc(100vh - 64px - 220px)', 
          },
        }}
      >
        {drawerContent}
        {
          isMobile && (
            token && user && (
              <Box display="flex" alignItems="center" ml={2}>
                <IconButton size="large" edge="start" color="inherit">
                    <Avatar src={user?.photo} alt={user?.name} sx={{ width: 32, height: 32, mr: 1 }} />
                </IconButton>
                  <Typography variant="body1" color="inherit">Hello {user?.name}</Typography>
              </Box>
            )
          )
        }
        {/* {
          token && user && (
              <Box display="flex" alignItems="center" ml={2}>
                <IconButton size="large" edge="start" color="inherit">
                    <Avatar src={user?.photo} alt={user?.name} sx={{ width: 32, height: 32, mr: 1 }} />
                </IconButton>
                  <Typography variant="body1" color="inherit">Hello {user?.name}</Typography>
              </Box>
          )
        } */}
      </Drawer>
    </Box>
  );
};

export default SideBar;

