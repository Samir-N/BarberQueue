import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import axios from "axios";
import dayjs from "dayjs";
import { bookingData } from "../redux/features/bookingSlice.js";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";

const WaitingList = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookings);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.get("/api/v1/user/getBookings");
        dispatch(bookingData(res.data.data));
        dispatch(hideLoading());
      } catch (err) {
        dispatch(hideLoading());
        console.log(err);
      }
    };
    fetchBookings();
  }, [dispatch]);

  const getStatus = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "completed":
        return {
          text: "Completed",
          icon: <CheckCircleIcon sx={{ fontSize: 18 }} />,
          bg: "#16A34A",
        };
      case "cancelled":
        return {
          text: "Cancelled",
          icon: <CancelIcon sx={{ fontSize: 18 }} />,
          bg: "#DC2626",
        };
      default:
        return {
          text: "Pending",
          icon: <ScheduleIcon sx={{ fontSize: 18 }} />,
          bg: "#2563EB",
        };
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: isMobile ? 2 : 4,
        backgroundColor: "#F9FAFB",
        minHeight: "auto",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#111827",
          marginBottom: 3,
          fontSize: isMobile ? "24px" : "32px",
        }}
      >
        Waiting List
      </Typography>

      {/* Content as dropdown list (accordion) */}
      {bookings?.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          {bookings.map((b, index) => {
            const status = getStatus(b.status);
            return (
              <Accordion
                key={b._id || index}
                disableGutters
                sx={{
                  mb: 1.5,
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  "&:before": { display: "none" },
                  overflow: "hidden",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 2,
                    py: 1.5,
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? 0.5 : 2,
                      alignItems: isMobile ? "flex-start" : "center",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      gap: 0.25,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {b.userId?.name || "N/A"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "#6B7280",
                      }}
                    >
                      {b.service?.serviceName || "N/A"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      mt: isMobile ? 0.5 : 0,
                    }}
                  >
                    <Chip
                      icon={<AccessTimeIcon sx={{ fontSize: 18 }} />}
                      label={b.bookingTime?dayjs(b.bookingTime).format("hh:mm A") : "N/A"}
                      size="small"
                      sx={{
                        backgroundColor: "#F3F4F6",
                        color: "#111827",
                        fontSize: 12,
                        fontWeight: 500,
                        height: 26,
                      }}
                    />
                    <Chip
                      icon={status.icon}
                      label={status.text}
                      size="small"
                      sx={{
                        backgroundColor: status.bg,
                        color: "#FFFFFF",
                        fontSize: 12,
                        fontWeight: 600,
                        height: 26,
                      }}
                    />
                  </Box>
                </AccordionSummary>
                <Divider />
                <AccordionDetails sx={{ px: 2, py: 1.5 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                    <Box>
                      <Typography
                        sx={{ fontSize: 12, color: "#6B7280", mb: 0.25 }}
                      >
                        User
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14, color: "#111827", fontWeight: 500 }}
                      >
                        {b.userId?.name || "N/A"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: 12, color: "#6B7280", mb: 0.25 }}
                      >
                        Service
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14, color: "#111827", fontWeight: 500 }}
                      >
                        {b.service?.serviceName || "N/A"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: 12, color: "#6B7280", mb: 0.25 }}
                      >
                        Booking Time
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14, color: "#111827", fontWeight: 500 }}
                      >
                        {
                        b.bookingTime? dayjs(b.bookingTime).format("DD MMM YYY, hh:mm A") :  "N/A"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: 12, color: "#6B7280", mb: 0.25 }}
                      >
                        Status
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14, color: "#111827", fontWeight: 500 }}
                      >
                        {status.text}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            padding: 6,
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#6B7280", fontWeight: 600, marginBottom: 1 }}
          >
            No bookings found
          </Typography>
          <Typography sx={{ color: "#9CA3AF", fontSize: "14px" }}>
            Book your first appointment to get started
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WaitingList;