import GlobalStyles from "@mui/joy/GlobalStyles";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { toggleSidebar } from "../lib/utils";
import { Box, Typography } from "@mui/joy";
import ColorSchemeToggle from "./ColorSchemeToggle";

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm",
      }}
    >
      {/* CSS Variable for header height */}
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />

      <Box className="flex justify-center  items-center gap-3">
        {/* Sidebar Toggle Button */}
        <IconButton
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Typography level="title-lg">Admin Portal</Typography>
      </Box>
      <ColorSchemeToggle />

    </Sheet>
  );
}
