const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({

    assetName: {
        type: String,
        required: true
    },

    issue: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    assignedTo: {
        type: String,
        required: true
    },

    maintenanceDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Maintenance", maintenanceSchema);