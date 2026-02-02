// components/DynamicBreadcrumb.tsx
"use client";

import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from 'next/link';

export default function DynamicBreadcrumb({ 
  customLabels = {},
  homeLabel = 'Dashboard'
}) {
  const pathname = usePathname();

  // Custom label mappings for better readability
  const defaultLabelMap = {
    'orders': 'Orders',
    'customers': 'Customers',
    'products': 'Products',
    'settings': 'Settings',
    'analytics': 'Analytics',
    'users': 'Users',
    'reports': 'Reports',
    ...customLabels
  };

  const generateBreadcrumbs = ()=> {
    const pathWithoutAdmin = pathname.replace('/admin', '');
    const segments = pathWithoutAdmin.split('/').filter(Boolean);

    // Return only home if we're on the dashboard
    if (segments.length === 0) {
      return [{ label: homeLabel, href: '/admin' }];
    }

    const breadcrumbs= [
      { label: homeLabel, href: '/admin' }
    ];

    let currentPath = '/admin';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Check if we have a custom label, otherwise format the segment
      let label = defaultLabelMap[segment];
      
      if (!label) {
        // Handle dynamic IDs (e.g., [id] or numeric values)
        if (!isNaN(Number(segment)) || segment.length > 20) {
          label = `#${segment.substring(0, 8)}`;
        } else {
          // Convert kebab-case or snake_case to Title Case
          label = segment
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }

      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon fontSize="sm" />}
        sx={{ pl: 0 }}
      >
        <Link
          underline="none"
          color="neutral"
          href="/admin"
          aria-label="Home"
        >
          <HomeRoundedIcon />
        </Link>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography
              key={crumb.href}
              color="primary"
              fontWeight={500}
              fontSize={12}
            >
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={crumb.href}
              underline="hover"
              color="neutral"
              href={crumb.href}
              fontSize={12}
              fontWeight={500}
            >
              {crumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}