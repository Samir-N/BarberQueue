import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import axios from "axios";
import dayjs from "dayjs";
import { bookingData } from "../redux/features/bookingSlice.js";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";

const WaitingList = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking?.bookings || []);

  // Correct store path from state.auth
  const user = useSelector((state) => state.auth?.user);
  const isAdmin = user?.role === "admin";

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

  useEffect(() => {
    fetchBookings();
  }, [dispatch]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      dispatch(showLoading());
    await axios.post(`/api/v1/user/admin/booking/${bookingId}/status`, { status });
      await fetchBookings();
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  };

  const totalBookings = bookings?.length || 0;
  const pendingCount =
    bookings?.filter((b) => !b.status || b.status.toLowerCase() === "pending")
      .length || 0;

  // Status mapping applying text colors instead of background colors
  const getStatus = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "conformed":
        return {
          text: "Conformed",
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          color: "#16A34A",
        };
      case "completed":
        return {
          text: "Completed",
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          color: "#059669",
        };
      case "cancelled":
        return {
          text: "Cancelled",
          icon: <CancelIcon sx={{ fontSize: 16 }} />,
          color: "#DC2626",
        };
      case "pending":
      default:
        return {
          text: "Pending",
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
          color: "#2563EB",
        };
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 3, md: 4 },
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#111827",
            fontSize: { xs: "22px", sm: "28px", md: "32px" },
          }}
        >
          Waiting List
        </Typography>

        {/* Counter Badges */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-end" },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#EFF6FF",
              flex: { xs: 1, sm: "initial" },
              justifyContent: "center",
            }}
          >
            <PeopleAltIcon sx={{ color: "#2563EB", fontSize: 18 }} />
            <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 600, color: "#1E40AF" }}>
              {pendingCount} Waiting
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#FFFFFF",
              flex: { xs: 1, sm: "initial" },
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 500, color: "#6B7280" }}>
              Total: <strong>{totalBookings}</strong>
            </Typography>
          </Paper>
        </Stack>
      </Box>

      {/* Main Content */}
      {bookings?.length > 0 ? (
        <>
          {/* Mobile View */}
          <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 2 }}>
            {bookings.map((b, index) => {
              const statusInfo = getStatus(b.status);
              const isPending = !b.status || b.status.toLowerCase() === "pending";

              return (
                <Paper
                  key={b._id || index}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid #E5E7EB",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon sx={{ color: "#6B7280", fontSize: 20 }} />
                      <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: 16 }}>
                        {b.userId?.name || "N/A"}
                      </Typography>
                    </Box>

                    {/* Text-colored Status without background padding */}
                    <Chip
                      icon={statusInfo.icon}
                      label={statusInfo.text}
                      size="small"
                      sx={{
                        backgroundColor: "transparent",
                        color: statusInfo.color,
                        fontSize: 12,
                        fontWeight: 800,
                        padding: 0,
                        height: "auto",
                        "& .MuiChip-icon": {
                          color: statusInfo.color,
                          marginLeft: 0,
                        },
                      }}
                    />
                  </Box>

                  <Divider />

                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ContentCutIcon sx={{ color: "#9CA3AF", fontSize: 16 }} />
                      <Typography sx={{ fontSize: 14, color: "#4B5563" }}>
                        <strong>Service:</strong> {b.service?.serviceName || "N/A"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayIcon sx={{ color: "#9CA3AF", fontSize: 16 }} />
                      <Typography sx={{ fontSize: 14, color: "#4B5563" }}>
                        {b.bookingTime
                          ? dayjs(b.bookingTime).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Stack>

                  {isAdmin && isPending && (
                    <>
                      <Divider />
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleStatusChange(b._id, "conformed")}
                          sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleStatusChange(b._id, "cancelled")}
                          sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </>
                  )}
                </Paper>
              );
            })}
          </Box>

          {/* Table View (sm+) */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              overflowX: "auto",
            }}
          >
            <Table aria-label="waiting list table">
              <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#374151" }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Booking Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#374151" }} align="center">
                    Status
                  </TableCell>
                  {isAdmin && (
                    <TableCell sx={{ fontWeight: 700, color: "#374151" }} align="center">
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((b, index) => {
                  const statusInfo = getStatus(b.status);
                  const isPending = !b.status || b.status.toLowerCase() === "pending";

                  return (
                    <TableRow
                      key={b._id || index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "#F9FAFB" },
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: "#111827" }}>
                        {b.userId?.name || "N/A"}
                      </TableCell>

                      <TableCell sx={{ color: "#4B5563" }}>
                        {b.service?.serviceName || "N/A"}
                      </TableCell>

                      <TableCell sx={{ color: "#4B5563" }}>
                        {b.bookingTime
                          ? dayjs(b.bookingTime).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </TableCell>

                      {/* Text-colored Status without background padding */}
                      <TableCell align="center">
                        <Chip
                          icon={statusInfo.icon}
                          label={statusInfo.text}
                          size="small"
                          sx={{
                            backgroundColor: "transparent",
                            color: statusInfo.color,
                            fontSize: 13,
                            fontWeight: 600,
                            padding: 0,
                            height: "auto",
                            "& .MuiChip-icon": {
                              color: statusInfo.color,
                              marginLeft: 0,
                            },
                          }}
                        />
                      </TableCell>

                      {isAdmin && (
                        <TableCell align="center">
                          {isPending ? (
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleStatusChange(b._id, "conformed")}
                                sx={{ textTransform: "none", fontWeight: 600 }}
                              >
                                Confirm
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleStatusChange(b._id, "cancelled")}
                                sx={{ textTransform: "none", fontWeight: 600 }}
                              >
                                Cancel
                              </Button>
                            </Stack>
                          ) : (
                            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                              No actions
                            </Typography>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            padding: { xs: 4, sm: 6 },
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography variant="h6" sx={{ color: "#6B7280", fontWeight: 600, marginBottom: 1 }}>
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