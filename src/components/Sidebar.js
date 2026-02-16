"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, {
  listItemButtonClasses,
} from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "../lib/utils";
import Link from "next/link";
import StarTwoTone from "@mui/icons-material/StarTwoTone";
import { logoutUser } from "@/services/auth";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);

  React.useEffect(() => {
    setOpen(defaultExpanded);
  }, [defaultExpanded]);

  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": { overflow: "hidden" },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}
      >
        {children}
      </Box>
    </>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const [admindata, setAdminData] = React.useState(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("admin");
      if (data) setAdminData(JSON.parse(data));
    }
  }, []);

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/");

  const isCoursesActive =
    isActive("/admin/course-list") ||
    isActive("/admin/category-list");

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />

      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

      {/* Header */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography level="title-lg">Admin Portal</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>

      <Divider />

      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) =>
              theme.vars.radius.sm,
          }}
        >
          {/* Dashboard */}
          {/* <ListItem>
            <ListItemButton
              component={Link}
              href="/admin"
              selected={pathname === "/admin"}
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">
                  Dashboard
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

          {/* Reviews */}
          <ListItem>
            <ListItemButton
              component={Link}
              href="/admin/review"
              selected={isActive("/admin/review")}
            >
              <StarTwoTone />
              <ListItemContent>
                <Typography level="title-sm">
                  Reviews
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* Contact */}
          <ListItem>
            <ListItemButton
              component={Link}
              href="/admin/contact"
              selected={isActive("/admin/contact")}
            >
              <PermContactCalendarIcon />
              <ListItemContent>
                <Typography level="title-sm">
                  Contact
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* Certificate */}
          <ListItem>
            <ListItemButton
              component={Link}
              href="/admin/certificate"
              selected={isActive("/admin/certificate")}
            >
              <WorkspacePremiumIcon />
              <ListItemContent>
                <Typography level="title-sm">
                  Certificate
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          {/* Courses Nested */}
          {/* <ListItem nested>
            <Toggler
              defaultExpanded={isCoursesActive}
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  onClick={() => setOpen(!open)}
                  selected={isCoursesActive}
                >
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">
                      Courses
                    </Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: open
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "0.2s",
                    }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    component={Link}
                    href="/admin/course-list"
                    selected={isActive("/admin/course-list")}
                  >
                    Course List
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    component={Link}
                    href="/admin/category-list"
                    selected={isActive("/admin/category-list")}
                  >
                    Category List
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem> */}
        </List>
      </Box>

      <Divider />

      {/* User Section */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">
            {admindata?.username ?? ""}
          </Typography>
          <Typography level="body-xs">
            {admindata?.email ?? ""}
          </Typography>
        </Box>
        <IconButton
          onClick={() => logoutUser()}
          size="sm"
          variant="plain"
          color="neutral"
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
