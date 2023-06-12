const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userObjectId: {
        type: String,
        unique: false,
        require: true
    },
    destinationId: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: [true, 'country name is required']
    },
    phoneNumber: {
        type: Number,
        require: [true, 'number is required']
    },
    date: {
        type: String,
        require: true
    },
    endingDate: {
        type: String,
        require: true,
    }
})


const booking = mongoose.model('booking', bookingSchema);
module.exports = booking;