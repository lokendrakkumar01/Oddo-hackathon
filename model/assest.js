const mongoose = require("mongoose");
const assestSchema = new mongoose.Schema({
  assetTag : String,
  assetName : String,
  serialNumber : String,
  category : String,
  location : String,
  status : String,
});

module.exports = mongoose.model("Asset",assestSchema);
