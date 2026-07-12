const sampleBookings = [

{
    employeeName:"Praveen Rai",
    resourceName:"Conference Room A",
    bookingDate:new Date("2026-07-15"),
    startTime:"10:00",
    endTime:"11:00",
    purpose:"Team Meeting",
    status:"Upcoming"
},

{
    employeeName:"Rahul Kumar",
    resourceName:"Projector",
    bookingDate:new Date("2026-07-16"),
    startTime:"02:00",
    endTime:"03:00",
    purpose:"Presentation",
    status:"Upcoming"
},

{
    employeeName:"Amit Singh",
    resourceName:"Laptop",
    bookingDate:new Date("2026-07-17"),
    startTime:"09:00",
    endTime:"05:00",
    purpose:"Office Work",
    status:"Approved"
}

];

module.exports = { data: sampleBookings };