const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Asset = require("./model/assest");

main()
.then(()=>{
  console.log("mongo connected");
}).catch(err =>{
  console.log(err);
})
async function main(){
  await
  mongoose.connect("mongodb://127.0.0.1:27017/assesflow");
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/assets", async (req,res)=>{
  console.log("Route hit");
  const assets = await Asset.find();
  console.log("Assets",assets);
  res.render("assets/index",{assets});
})
app.get("/assets/new",(req,res)=>{
  res.render("/assets/new");
})
app.get("/assets/:id",(req,res)=>{
  res.render("assets/show");
})
app.get("/asset/:id/edit",(req,res)=>{
  res.render("/asset/edit");
})
app.get("/departments",(req,res)=>{
  res.render("departments/index");
})
app.get("/employees",(req,res)=>{
  res.render("employees/index");
})




app.get("/",(req,res)=>{
  res.send("Home");
})

app.listen(8080,()=>{
  console.log("Listening to 8080");
})

