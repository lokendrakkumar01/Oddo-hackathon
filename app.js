const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Asset = require("./model/assest");
const Department = require("./model/department");
const Allocation = require("./model/allocation");

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
  const assets = await Asset.find();
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
app.get("/departments",async (req,res)=>{
  const departments = await Department.find({});
  console.log(departments);
  res.render("departments/index",{departments});
})
app.get("/departments/new",(req,res)=>{
  res.render("departments/new");
})
app.post("/departments",async (req,res)=>{
  const department = new Department(req.body.dapartment);
  await department.save();
  res.redirect("/departments");
})
app.get("/departments/:id",async (req,res)=>{
  const department = await Department.findById(req.params.id);
  res.render("departments/show",{department});
})
app.get("/departments/:id/edit", async (req, res) => {
    const department = await Department.findById(req.params.id);
    res.render("departments/edit", { department });
});
app.put("/departments/:id", async (req, res) => {
    await Department.findByIdAndUpdate(
        req.params.id,
        req.body.department
    );
    res.redirect(`/departments/${req.params.id}`);

});
app.delete("/departments/:id", async (req, res) => {

    await Department.findByIdAndDelete(req.params.id);

    res.redirect("/departments");

});
app.get("/employees",(req,res)=>{
  res.render("employees/index");
})

app.get("/allocations", async (req, res) => {

    const allocations = await Allocation.find({});

    res.render("allocations/index", { allocations });

});
app.get("/allocations/new", (req, res) => {

    res.render("allocations/new");

});
app.post("/allocations", async (req, res) => {

    const allocation = new Allocation(req.body.allocation);

    await allocation.save();

    res.redirect("/allocations");

});
app.get("/allocations/:id", async (req, res) => {

    const allocation = await Allocation.findById(req.params.id);

    res.render("allocations/show", { allocation });

});
app.get("/allocations/:id/edit", async (req, res) => {

    const allocation = await Allocation.findById(req.params.id);

    res.render("allocations/edit", { allocation });

});

app.put("/allocations/:id", async (req, res) => {

    await Allocation.findByIdAndUpdate(
        req.params.id,
        req.body.allocation
    );

    res.redirect(`/allocations/${req.params.id}`);

});
app.delete("/allocations/:id", async (req, res) => {

    await Allocation.findByIdAndDelete(req.params.id);

    res.redirect("/allocations");

});

app.get("/",(req,res)=>{
  res.send("Home");
})

app.listen(8080,()=>{
  console.log("Listening to 8080");
})

