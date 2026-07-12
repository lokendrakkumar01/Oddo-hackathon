const mongoose = require("mongoose");

const Booking = require("../model/booking");

const initData = require("./bookingData");

main()
.then(()=>{
    console.log("Mongo Connected");
})
.catch(err=>{
    console.log(err);
});

async function main(){

    await mongoose.connect("mongodb://127.0.0.1:27017/assesflow");

}

const initDB = async()=>{

    await Booking.deleteMany({});

    await Booking.insertMany(initData.data);

    console.log("Booking Data Initialized");

};

initDB();