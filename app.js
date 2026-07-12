const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Asset = require("./model/assest");
const Department = require("./model/department");
const Allocation = require("./model/allocation");

const Employee = require("./model/employee");
const Booking = require("./model/booking");

const methodOverride = require("method-override");
const bookingRoutes = require("./routes/bookings");
const maintenanceRoutes=require("./routes/maintenances");
const reportRoutes = require("./routes/reports");
const authRoutes=require("./routes/auth");
const session = require("express-session");
const MongoStore = require("connect-mongo");


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
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use("/bookings", bookingRoutes);
app.use("/maintenances",maintenanceRoutes);
app.use("/reports", reportRoutes);
app.use(session({

    secret: "assetflowsecret",

    resave: false,

    saveUninitialized: false,

   

    cookie: {

        maxAge: 1000 * 60 * 60 * 24

    }

}));
app.use("/",authRoutes);


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
app.get("/employees",async (req,res)=>{
  const employees = await Employee.find();
  res.render("employees/index",{employees});
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
app.get("/dashboard", async (req, res) => {

    try{

        const totalAssets = await Asset.countDocuments();

        const totalEmployees = await Employee.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalAllocations = await Allocation.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const availableAssets = await Asset.countDocuments({
            status:"Available"
        });

        const allocatedAssets = await Asset.countDocuments({
            status:"Allocated"
        });

        const recentAssets = await Asset.find({})
        .sort({_id:-1})
        .limit(5);

        const recentEmployees = await Employee.find({})
        .sort({_id:-1})
        .limit(5);

        const recentBookings = await Booking.find({})
        .sort({_id:-1})
        .limit(5);

        res.render("dashboard/index",{

            totalAssets,

            totalEmployees,

            totalDepartments,

            totalAllocations,

            totalBookings,

            availableAssets,

            allocatedAssets,

           recentAssets,

            recentEmployees,

            recentBookings

        });

    }
    catch(err){

        console.log(err);

    }

});
// app.get("/maintenance",(req,res)=>{
//     res.send("Maintenance Page");
// });

// app.get("/audit",(req,res)=>{
//     res.send("Audit Page");
// });

// app.get("/reports",(req,res)=>{
//     res.send("Reports Page");
// });

// app.get("/settings",(req,res)=>{
//     res.send("Settings Page");
// });
app.get("/",(req,res)=>{
  res.redirect("/dashboard");
})

app.listen(8080,()=>{
  console.log("Listening to 8080");
})

