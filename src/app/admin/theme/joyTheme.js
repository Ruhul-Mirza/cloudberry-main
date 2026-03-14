"use client";

import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#000000",
          600: "#1a1a1a",
          700: "#262626",
          800: "#333333",
          900: "#0a0a0a",

          solidColor: "#ffffff",
          solidBg: "#000000",
          solidHoverBg: "#1a1a1a",
          solidActiveBg: "#333333",

          outlinedColor: "#000000",
          outlinedBorder: "#d1d1d1",
          outlinedHoverBg: "#f5f5f5",

          softBg: "#f5f5f5",
          softColor: "#000000",
        },

        background: {
          body: "#ffffff",
          surface: "#fafafa",
          backdrop: "rgba(0,0,0,0.35)",
        },

        text: {
          primary: "#000000",
          secondary: "#525252",
        },
      },
    },

    dark: {
      palette: {
        primary: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#ffffff",
          600: "#d4d4d4",
          700: "#a3a3a3",
          800: "#737373",
          900: "#404040",

          solidColor: "#000000",
          solidBg: "#ffffff",
          solidHoverBg: "#e5e5e5",
          solidActiveBg: "#d4d4d4",

          outlinedColor: "#ffffff",
          outlinedBorder: "#404040",
          outlinedHoverBg: "#1a1a1a",

          softBg: "#171717",
          softColor: "#ffffff",
        },

        background: {
          body: "#0a0a0a",
          surface: "#141414",
          backdrop: "rgba(0,0,0,0.75)",
        },

        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa",
        },
      },
    },
  },

  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },

  components: {
    JoyListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.radius.md,
          transition: "all 0.2s ease",

          "&:hover": {
            backgroundColor:
              theme.vars.palette.mode === "dark"
                ? "#1f1f1f"
                : "#f5f5f5",
          },

          "&.Mui-selected": {
            backgroundColor:
              theme.vars.palette.mode === "dark"
                ? "#262626"
                : "#eaeaea",
            fontWeight: 600,
          },

          /* Focus styling */
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: theme.vars.palette.primary[500],
            outlineOffset: "2px",
          },
        }),
      },
    },

    JoyListItem: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },

    JoyList: {
      styleOverrides: {
        root: {
          gap: "6px",
        },
      },
    },
    JoyTable: {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.radius.md,
      borderCollapse: "separate",
      borderSpacing: 0,

      "--Table-headerUnderlineThickness": "1px",
      "--TableRow-hoverBackground": 
        theme.vars.palette.mode === "dark"
          ? "#1f1f1f"
          : "#f5f5f5",

      backgroundColor: theme.vars.palette.background.surface,

      "& thead th": {
        fontWeight: 600,
        backgroundColor:
          theme.vars.palette.mode === "dark"
            ? "#171717"
            : "#fafafa",
        borderBottom: "1px solid",
        borderColor: theme.vars.palette.divider,
      },

      "& tbody tr": {
        transition: "background 0.2s ease",
      },

      "& tbody tr:hover": {
        backgroundColor:
          theme.vars.palette.mode === "dark"
            ? "#1f1f1f"
            : "#f5f5f5",
      },

      "& td": {
        borderBottom: "1px solid",
        borderColor: theme.vars.palette.divider,
      },
    }),
  },
},
  },
});

export default theme;