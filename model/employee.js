const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    employeeName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    designation: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Active"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Employee", employeeSchema);