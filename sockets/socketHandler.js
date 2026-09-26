module.exports = (io) => {

    
  io.on("connection", (socket) => {

    console.log("New client connected:", socket.id);
    //User Joined
    socket.on("user-joined", (userData) =>{
      console.log("User joined:", userData);
    })

    //Appoinment Booked
    socket.on("appointment-booked", (appointmentData) => {
      console.log("Appointment booked:", appointmentData);
    });

    //Appoinment Cancelled
    socket.on("appointment-cancelled", (appointmentData) => {
      console.log("Appointment cancelled:", appointmentData);
    });

    //Appoinment Completed
    socket.on("appointment-completed", (appointmentData) => {
      console.log("Appointment completed:", appointmentData);
    });


    socket.on("disconnect", () => {
      console.log("user disconnected:", socket.id);
    });

  });

  // Additional socket event handlers can be added here
}