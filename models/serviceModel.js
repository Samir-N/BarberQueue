const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true,
            enum: ['Adult Haircut', 'Children Haircut', 'Clean Shave', 'Shave + Haircut']
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }
);

const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;