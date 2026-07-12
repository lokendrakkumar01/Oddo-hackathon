const mongoose = require("mongoose");
const Allocation = require("../model/allocation");
const allocationData = require("./allocationData");

main()
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/assesflow");
}

const initDB = async () => {
    await Allocation.deleteMany({});
    await Allocation.insertMany(allocationData);
    console.log("Allocation Data Inserted");
    mongoose.connection.close();
};

initDB();