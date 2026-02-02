// app/admin/page.tsx (Dashboard)
"use client";

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function DashboardPage() {
  return (
    <>
      
      <Box sx={{ flex: 1 }}>
        {/* Your dashboard content here */}
        <Typography>Welcome to the admin dashboard</Typography>
      </Box>
    </>
  );
}