const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
    employee: {
        type: String,
        required: true,
    },
    asset: {
        type: String,
        required: true,
    },
    allocatedDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["Allocated", "Returned"],
        default: "Allocated",
    },
});

module.exports = mongoose.model("Allocation", allocationSchema);