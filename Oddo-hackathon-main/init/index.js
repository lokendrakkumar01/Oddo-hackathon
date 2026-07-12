const mongoose = require("mongoose");
const Assest = require("../model/assest");
const initData = require("./data");
const assest = require("../model/assest");

main()
.then(()=>{
  console.log("Database Conected");
})
.catch(err =>console.log(err));
async function main(){
  await 
  mongoose.connect("mongodb://127.0.0.1:27017/assesflow");
}
const initDB = async ()=>{
  await assest.deleteMany({});
  await assest.insertMany(initData);
  console.log("Dummy Data Inserted");
}
initDB();