const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    employeeName: {
        type: String,
        required: true
    },

    resourceName: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Upcoming"
    }

});

module.exports = mongoose.model("Booking", bookingSchema);