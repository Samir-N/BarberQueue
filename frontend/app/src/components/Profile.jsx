import { useSelector } from "react-redux";
import { Box, Card, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
        mb: { xs: 3, sm: 0 },
        width: "100%",
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
        Profile
      </Typography>
      <Box sx={{ overflowX: "auto" }}>
        <Table
          size="small"
          sx={{
            minWidth: 260,
            "& td, & th": { py: 0.75, px: 1.5 },
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: "#6B7280",
                  width: "40%",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#111827",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {user?.name || "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: "#6B7280",
                  width: "40%",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  color: "#111827",
                  borderBottom: "1px solid #E5E7EB",
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 500,
                  color: "#6B7280",
                  width: "40%",
                  borderBottom: "none",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  color: "#111827",
                  borderBottom: "none",
                }}
              >
                {user?.phone || "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default Profile;
