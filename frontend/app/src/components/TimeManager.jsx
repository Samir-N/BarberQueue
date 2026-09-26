import { useState } from "react";
import { Box, Paper, Typography, ButtonBase } from "@mui/material";

const TimeManager = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const morningSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"];
  const eveningSlots = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

  return (
    <Box sx={{ width: "auto", mb: 2 }}>
      <Paper elevation={1} sx={{ border: "1px solid #e5e7eb" }}>
        <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Box>
            <Typography variant="body2" fontWeight={500} color="#000" sx={{ mb: 0.5, px: 0.5 }}>
              Morning
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0.5 }}>
              {morningSlots.map((time) => (
                <ButtonBase
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    onTimeSelect(time); // ✅ send to parent
                  }}
                  sx={{
                    py: 1,
                    px: 0.5,
                    borderRadius: 1,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "all 0.2s",
                    border: selectedTime === time ? "3px solid #FFC300" : "1px solid transparent",
                    bgcolor: selectedTime === time ? "#ffe9a2ff" : "#eef2ff",
                    color: selectedTime === time ? "#000" : "#374151",
                  }}
                >
                  {time}
                </ButtonBase>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500} color="#000" sx={{ mb: 0.5, px: 0.5 }}>
              Evening
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0.5 }}>
              {eveningSlots.map((time) => (
                <ButtonBase
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    onTimeSelect(time); // ✅ send to parent
                  }}
                  sx={{
                    py: 1,
                    px: 0.5,
                    borderRadius: 1,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    transition: "all 0.2s",
                    bgcolor: selectedTime === time ? "#ffe9a2ff" : "#eef2ff",
                    border: selectedTime === time ? "3px solid #FFC300" : "1px solid transparent",
                    color: selectedTime === time ? "#000" : "#374151",
                  }}
                >
                  {time}
                </ButtonBase>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TimeManager;
