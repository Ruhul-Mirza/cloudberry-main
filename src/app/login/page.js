"use client";

import * as React from "react";
import {
  CssVarsProvider,
  extendTheme,
  useColorScheme,
} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

const theme = extendTheme({ defaultColorScheme: "dark" });

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      size="sm"
      variant="outlined"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await loginUser({ email, password });
      router.push("/admin/review");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Transition-duration": "0.4s",
          },
        }}
      />

      <Box sx={{ minHeight: "100vh", display: "flex" }}>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            px: 3,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton variant="soft" color="primary">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Cloudberry Admin</Typography>
            </Stack>
            <ColorSchemeToggle />
          </Box>

          <Box sx={{ my: "auto", mx: "auto", width: 360 }}>
            <Typography level="h3" mb={1}>
              Sign in
            </Typography>

            {error && (
              <Typography level="body-sm" color="danger" mb={2}>
                {error}
              </Typography>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="password" />
                </FormControl>

                <Checkbox label="Remember me" />

                <Button type="submit" loading={loading}>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "50%",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </CssVarsProvider>
  );
}
