const serviceModel = require('../models/serviceModel');
const serviceController = async (req, res) => {
    try{

        const services = await serviceModel.find();
        res.status(200).send(
            {
                message: "Services fetched successfully",
                success: true,
                data: services
            }
        );


    }
    catch(error){
        res.status(500).send({
            message: "Error in service controller",
            error: error.message});
    }
}

module.exports = serviceController;