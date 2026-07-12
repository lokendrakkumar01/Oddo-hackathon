const express=require("express");
const router=express.Router();

const Maintenance=require("../model/maintenance");

// INDEX
router.get("/",async(req,res)=>{
    const maintenances=await Maintenance.find();
    res.render("maintenances/index",{maintenances});
});

// NEW
router.get("/new",(req,res)=>{
    res.render("maintenances/new");
});

// CREATE
router.post("/",async(req,res)=>{
    const maintenance=new Maintenance(req.body.maintenance);
    await maintenance.save();
    res.redirect("/maintenances");
});

// SHOW
router.get("/:id",async(req,res)=>{
    const maintenance=await Maintenance.findById(req.params.id);
    res.render("maintenances/show",{maintenance});
});

// EDIT
router.get("/:id/edit",async(req,res)=>{
    const maintenance=await Maintenance.findById(req.params.id);
    res.render("maintenances/edit",{maintenance});
});

// UPDATE
router.put("/:id",async(req,res)=>{
    await Maintenance.findByIdAndUpdate(
        req.params.id,
        req.body.maintenance
    );

    res.redirect("/maintenances");
});

// DELETE
router.delete("/:id",async(req,res)=>{
    await Maintenance.findByIdAndDelete(req.params.id);
    res.redirect("/maintenances");
});

module.exports=router;