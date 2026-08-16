import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  insertPersonalBooking,
  clearPersonalBooking,
} from "../redux/features/bookingSlice";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { showBooking } from "../redux/features/bookingSlice";
import EditBooking from "./EditBooking.jsx";
import axios from "axios";
import dayjs from "dayjs";

const PersonalBookings = () => {
  const { personalBooking } = useSelector((state) => state.booking);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  
  const isVisible = useSelector((state) => state.booking.isVisible);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchPersonalBooking = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/user/personalBookings",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          dispatch(insertPersonalBooking(res.data.data));
        } else {
          dispatch(clearPersonalBooking());
        }
        dispatch(hideLoading());
      } catch (err) {
        dispatch(hideLoading());
        console.error("Error fetching personal booking:", err);
        dispatch(clearPersonalBooking());
      }
    };

    if (token) fetchPersonalBooking();
  }, [dispatch, token]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/user/personalBooking/delete/${personalBooking._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(clearPersonalBooking());
      setOpenDeleteDialog(false);
      alert("Booking deleted successfully.");
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking. Please try again.");
    }
  };

  const handleEdit = () => {
    dispatch(showBooking());
  }

  if (!personalBooking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#F9FAFB",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            p: { xs: 2, sm: 3 },
            textAlign: "center",
            borderRadius: 2,
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" fontWeight="700" gutterBottom sx={{ color: "#111827" }}>
            No Booking Found
          </Typography>
          <Typography sx={{ color: "#6B7280" }}>
            You haven't made any bookings yet. Book your first appointment to get started!
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
      
          {
            isVisible ?
            (
                <Card
          sx={{
            borderRadius: 2,
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            p: { xs: 2, sm: 3 },
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            mb: 2,
          }}
        >
          <EditBooking />
          </Card>

            )
            :
<Card
          sx={{
            borderRadius: 2,
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            p: { xs: 2, sm: 3 },
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >

          <Typography
            sx={{
              fontSize: { xs: 16, sm: 18 },
              fontWeight: 600,
              color: "#111827",
              mb: 1.5,
            }}
          >
            Booking Details
          </Typography>

          <Box sx={{ overflowX: "auto", mb: 2 }}>
            <Table
              size="small"
              sx={{
                minWidth: 260,
                "& td, & th": { py: 0.75, px: 1.5 },
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 500, color: "#6B7280", width: "40%", borderBottom: "1px solid #E5E7EB" }}>
                    Service
                  </TableCell>
                  <TableCell sx={{ color: "#111827", borderBottom: "1px solid #E5E7EB" }}>
                    {personalBooking.service?.serviceName || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 500, color: "#6B7280", width: "40%", borderBottom: "1px solid #E5E7EB" }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ color: "#111827", borderBottom: "1px solid #E5E7EB" }}>
                    Rs. {personalBooking.service?.price || "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 500, color: "#6B7280", width: "40%", borderBottom: "1px solid #E5E7EB" }}>
                    Time
                  </TableCell>
                  <TableCell sx={{ color: "#111827", borderBottom: "1px solid #E5E7EB" }}>
                    {personalBooking.bookingTime ? dayjs(personalBooking.bookingTime).format("hh:mm A") : "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 500, color: "#6B7280", width: "40%", borderBottom: "none" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "#111827", borderBottom: "none", textTransform: "capitalize" }}>
                    {personalBooking.status || "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
            <Button variant="contained" fullWidth onClick={handleEdit} sx={{ textTransform: "none" }}>
              Edit
            </Button>
            <Button variant="outlined" fullWidth onClick={() => setOpenDeleteDialog(true)} sx={{ textTransform: "none" }}>
              Delete
            </Button>
          </Box>
        </Card>
        }

        
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this booking?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonalBookings;
