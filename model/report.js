const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    reportTitle:{
        type:String,
        required:true
    },

    reportType:{
        type:String,
        required:true
    },

    generatedBy:{
        type:String,
        required:true
    },

    reportDate:{
        type:Date,
        required:true
    },

    totalAssets:{
        type:Number,
        required:true
    },

    allocatedAssets:{
        type:Number,
        required:true
    },

    availableAssets:{
        type:Number,
        required:true
    },

    remarks:{
        type:String
    }

},{timestamps:true});

module.exports = mongoose.model("Report",reportSchema);