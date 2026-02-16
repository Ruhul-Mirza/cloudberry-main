"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import DynamicTitle from "@/components/DynamicTitle";
import { useAuth } from "@/lib/useAuth";

export default function AdminLayout({
  children,
}) {
  const { loading } = useAuth();

  if (loading) return null; // or spinner

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          {/* <DynamicBreadcrumb /> */}
          {children}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
