"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Sheet,
  Stack,
  Divider,
  Skeleton,
} from "@mui/joy";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

// Date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

export default function VerifyCertificate() {
  const { certificateId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/certificates/verify/${certificateId}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result?.data?.[0]?.[0]);
        if (!result.success) {
          setError(result.message);
        } else {
          setData(result?.data?.[0]?.[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }, [certificateId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8f9fa",
          py: { xs: 3, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          {/* Header Skeleton */}
          <Card
            variant="outlined"
            sx={{
              mb: 3,
              borderLeft: "4px solid",
              borderLeftColor: "success.500",
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
              <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: "lg" }} />
            </Stack>
          </Card>

          {/* Details Skeleton */}
          <Card
            variant="outlined"
            sx={{
              mb: 3,
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Skeleton variant="text" width="30%" height={28} sx={{ mb: 3 }} />
            <Stack spacing={2.5}>
              {[1, 2, 3, 4].map((i) => (
                <Box key={i}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Skeleton variant="circular" width={20} height={20} sx={{ mt: 0.5 }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="30%" height={18} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width="50%" height={24} />
                    </Box>
                  </Stack>
                  {i < 4 && <Divider sx={{ mt: 2.5 }} />}
                </Box>
              ))}
            </Stack>
          </Card>

          {/* Preview Skeleton */}
          <Card
            variant="outlined"
            sx={{
              mb: 3,
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Skeleton variant="text" width="30%" height={28} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={600} sx={{ borderRadius: "sm" }} />
          </Card>

          {/* Action Button Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Skeleton variant="rectangular" width={120} height={48} sx={{ borderRadius: "lg" }} />
            <Skeleton variant="rectangular" width={220} height={48} sx={{ borderRadius: "lg" }} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f8f9fa",
          p: 3,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 500,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Alert
            color="danger"
            variant="soft"
            sx={{
              border: "none",
              bgcolor: "transparent",
            }}
          >
            <Typography level="title-md" sx={{ mb: 1 }}>
              Verification Failed
            </Typography>
            <Typography level="body-sm">{error}</Typography>
          </Alert>
        </Card>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header Card */}
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            borderLeft: "4px solid",
            borderLeftColor: "success.500",
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
            },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <Box
              sx={{
                p: 1,
                borderRadius: "50%",
                bgcolor: "success.50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleRoundedIcon
                sx={{ fontSize: 40, color: "success.500" }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography level="h2" sx={{ mb: 0.5, fontWeight: 700 }}>
                Certificate Verified
              </Typography>
              <Typography level="body-sm" sx={{ color: "text.secondary" }}>
                This certificate is authentic and has been verified successfully
              </Typography>
            </Box>
            <Box sx={{ ml: { sm: "auto" } }}>
              <Chip
                color="success"
                variant="soft"
                size="lg"
                startDecorator={<VerifiedUserRoundedIcon />}
                sx={{
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                }}
              >
                Verified
              </Chip>
            </Box>
          </Stack>
        </Card>

        {/* Certificate Details */}
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography
            level="title-lg"
            sx={{
              mb: 3,
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            Certificate Details
          </Typography>

          <Stack spacing={2.5}>
            <InfoRow
              icon={<PersonRoundedIcon />}
              label="Student Name"
              value={data.student_name}
            />
            <Divider />
            <InfoRow
              icon={<SchoolRoundedIcon />}
              label="Course"
              value={data.course_title}
            />
            <Divider />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2.5,
              }}
            >
              <InfoRow
                icon={<CalendarTodayRoundedIcon />}
                label="Start Date"
                value={formatDate(data.start_date)}
              />
              <InfoRow
                icon={<CalendarTodayRoundedIcon />}
                label="End Date"
                value={formatDate(data.end_date)}
              />
            </Box>
            <Divider />
            <InfoRow
              icon={<CalendarTodayRoundedIcon />}
              label="Issued On"
              value={formatDate(data.created_at)}
            />
          </Stack>
        </Card>

        {/* PDF Preview */}
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            bgcolor: "white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography
            level="title-lg"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            Certificate Preview
          </Typography>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "sm",
              overflow: "hidden",
              bgcolor: "background.surface",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <iframe
              src={`${process.env.NEXT_PUBLIC_API_URL}/certificates/preview/${certificateId}`}
              style={{
                width: "100%",
                height: "600px",
                border: "none",
                display: "block",
              }}
              title="Certificate Preview"
            />
          </Sheet>
        </Card>

        {/* Actions */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            size="lg"
            startDecorator={<ShareRoundedIcon />}
            sx={{
              px: 4,
              fontWeight: 500,
            }}
          >
            Share
          </Button>
          <Button
            component="a"
            href={`${process.env.NEXT_PUBLIC_API_URL}/certificates/preview/${certificateId}`}
            target="_blank"
            size="lg"
            startDecorator={<DownloadRoundedIcon />}
            sx={{
              px: 4,
              fontWeight: 600,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Download Certificate
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          color: "primary.500",
          mt: 0.5,
          fontSize: 20,
          p: 1,
          borderRadius: "md",
          bgcolor: "primary.50",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          level="body-sm"
          sx={{
            color: "text.secondary",
            mb: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {label}
        </Typography>
        <Typography level="title-md" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}