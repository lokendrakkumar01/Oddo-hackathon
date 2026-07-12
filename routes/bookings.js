const express = require("express");
const router = express.Router();
const Booking = require("../model/booking");

// INDEX
router.get("/", async (req, res) => {
    const allBookings = await Booking.find();
    res.render("bookings/index", { allBookings });
});

// NEW
router.get("/new", (req, res) => {
    res.render("bookings/new");
});

// CREATE
router.post("/", async (req, res) => {

    console.log(req.body);

    try {

        const booking = new Booking(req.body.booking);

        await booking.save();

        res.redirect("/bookings");

    } catch (err) {

        console.log(err);

        res.send(err);

    }

});

// SHOW
router.get("/:id", async (req, res) => {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.send("Booking Not Found");
    }

    res.render("bookings/show", { booking });

});
// EDIT
router.get("/:id/edit", async (req, res) => {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return res.send("Booking Not Found");
    }

    res.render("bookings/edit", { booking });

});

router.put("/:id", async (req, res) => {

    await Booking.findByIdAndUpdate(
        req.params.id,
        req.body.booking,
       { returnDocument: "after" }
    );

    res.redirect("/bookings/" + req.params.id);

});

router.delete("/:id", async (req, res) => {

    await Booking.findByIdAndDelete(req.params.id);

    res.redirect("/bookings");

});
module.exports = router;