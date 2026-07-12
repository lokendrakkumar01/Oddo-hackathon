const express=require("express");
const router=express.Router();

const Report=require("../model/report");

// INDEX
router.get("/",async(req,res)=>{

    const reports=await Report.find();

    res.render("reports/index",{reports});

});

// NEW
router.get("/new",(req,res)=>{

    res.render("reports/new");

});

// CREATE
router.post("/",async(req,res)=>{

    const report=new Report(req.body.report);

    await report.save();

    res.redirect("/reports");

});

// SHOW
router.get("/:id",async(req,res)=>{

    const report=await Report.findById(req.params.id);

    res.render("reports/show",{report});

});

// EDIT
router.get("/:id/edit",async(req,res)=>{

    const report=await Report.findById(req.params.id);

    res.render("reports/edit",{report});

});

// UPDATE
router.put("/:id",async(req,res)=>{

    await Report.findByIdAndUpdate(

        req.params.id,

        req.body.report

    );

    res.redirect("/reports");

});

// DELETE
router.delete("/:id",async(req,res)=>{

    await Report.findByIdAndDelete(req.params.id);

    res.redirect("/reports");

});

module.exports=router;