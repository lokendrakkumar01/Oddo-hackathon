const mongoose = require("mongoose");
const Department = require("../model/department");
const departmentData = require("./departmentData");

main()
.then(() => {
    console.log("Database Connected");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/assesflow");
}

const initDB = async () => {
    await Department.deleteMany({});
    await Department.insertMany(departmentData);
    console.log("Departments Inserted");
    mongoose.connection.close();
};

initDB();