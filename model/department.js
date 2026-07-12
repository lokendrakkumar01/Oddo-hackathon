const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },

    departmentHead: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    description: {
        type: String
    }
});

module.exports = mongoose.model("Department", departmentSchema);