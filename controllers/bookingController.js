const bookingModel = require('../models/bookingModel');

const bookingController = async (req, res) => {

    try{
        // Extract data from request body (userId is added by authMiddleware)
        const { service, bookingTime, userId } = req.body;

        // Validate required fields
        if (!service || !bookingTime || !userId) {
            return res.status(400).send({
                message: "Missing required fields: service, bookingTime, and userId are required",
                success: false
            });
        }

        // Create booking with all required fields
        const booking = new bookingModel({
            userId: userId,
            service: service,
            bookingTime: bookingTime
        });

        //PREVENTS DOUBLE BOOKING BY SAME USER
        const existingBooking = await bookingModel.findOne({userId:userId});
        if(existingBooking)
        {
            
            return res.status(400).send({
                message: "Booking already exists for this user",
                success: false
            });
          
        }

        await booking.save();

        res.status(200).send({
            message: "Booking info received successfully",
            success: true,
            data: booking
        });
    }
    catch(error){
        res.status(500).send({
            message: "Error in booking controller",
            error: error.message,
            success: false
        });
    }   

}

const bookingsFetchController = async(req,res) =>{
  try{
        

       const bookingData = await bookingModel.find().populate('service').populate('userId');

       

        res.status(200).send({
            message: "BookingData received successfully",
            success: true,
            data: bookingData
        });
    }
    catch(error){
        res.status(500).send({
            message: "Error in booking controller",
            error: error.message,
            success: false
        });
    }   
}

const personalBookingFetchController = async(req,res) =>{
    try{
            // userId is added by authMiddleware
            const userId = req.body.userId;
            
            if (!userId) {
                return res.status(400).send({
                    message: "User ID is required",
                    success: false
                });
            }

            const bookingData = await bookingModel.findOne({userId:userId}).populate('service').populate('userId');

            res.status(200).send({
                message: "Personal BookingData received successfully",
                success: true,
                data: bookingData
            });
        }   
        catch(error){

            res.status(500).send({
                message: "Error in personal booking controller",
                error: error.message,   
                success: false
            });
        }
}

const deleteBookingController = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId) {
            return res.status(400).send({
                message: "Booking ID is required",
                success: false
            });
        }
        const deletedBooking = await bookingModel.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).send({
                message: "Booking not found",
                success: false
            });
        }   
        res.status(200).send({
            message: "Booking deleted successfully",
            success: true,
            data: deletedBooking
        });
    } catch (error) {
        res.status(500).send({
            message: "Error in delete booking controller",  
            error: error.message,
            success: false
        });
    }
}


const editBookingController = async (req, res) => {

    try {
        const bookingId = req.params.id;
        const { service, bookingTime } = req.body;  
        if (!bookingId) {
            return res.status(400).send({
                message: "Booking ID is required",
                success: false
            });
        }
        if (!service || !bookingTime) {
            return res.status(400).send({
                message: "Service and bookingTime are required",
                success: false
            });
        }
        const updatedBooking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { service, bookingTime },
            { new: true }
        ).populate('service').populate('userId');
        if (!updatedBooking) {
            return res.status(404).send({
                message: "Booking not found",
                success: false
            });
        }
        res.status(200).send({
            message: "Booking updated successfully",
            success: true,
            data: updatedBooking
        });
    } catch (error) {
        res.status(500).send({
            message: "Error in edit booking controller",
            error: error.message,
            success: false
        });
    }
        

}

module.exports =  {editBookingController, personalBookingFetchController,bookingController,bookingsFetchController,deleteBookingController};