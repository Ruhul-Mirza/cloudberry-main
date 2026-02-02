// components/DynamicTitle.tsx
"use client";

import { usePathname } from 'next/navigation';
import { Box, Typography } from '@mui/joy';
import React, { ReactNode } from 'react';

export default function DynamicTitle({ 
  title,
  customTitles = {},
  actions 
}) {
  const pathname = usePathname();

  // Custom title mappings for different routes
  const defaultTitleMap= {
    '/admin': 'Dashboard',
    '/admin/orders': 'Orders',
    '/admin/customers': 'Customers',
    '/admin/products': 'Products',
    '/admin/settings': 'Settings',
    '/admin/analytics': 'Analytics',
    '/admin/users': 'Users',
    '/admin/reports': 'Reports',
    ...customTitles
  };

  const generateTitle = () => {
    // If title prop is provided, use it
    if (title) return title;

    // Check if we have a custom title for this exact path
    if (defaultTitleMap[pathname]) {
      return defaultTitleMap[pathname];
    }

    // Generate title from pathname
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];

    // Skip 'admin' in the path
    if (lastSegment === 'admin') {
      return 'Dashboard';
    }

    // Handle dynamic routes (IDs, UUIDs, etc.)
    if (!isNaN(Number(lastSegment)) || lastSegment.length > 20) {
      // Look at the second-to-last segment for context
      const parentSegment = segments[segments.length - 2];
      if (parentSegment) {
        const parentTitle = parentSegment
          .replace(/[-_]/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return `${parentTitle} Details`;
      }
      return 'Details';
    }

    // Convert kebab-case or snake_case to Title Case
    return lastSegment
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pageTitle = generateTitle();

  return (
    <Box
      sx={{
        display: 'flex',
        mb: 1,
        gap: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography level="h2" component="h1">
        {pageTitle}
      </Typography>
      
      {actions && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {actions}
        </Box>
      )}
    </Box>
  );
}