const assetChart = document.getElementById("assetChart");

new Chart(assetChart, {

type:"bar",

data:{

labels:["Assets","Employees","Departments","Bookings"],

datasets:[{

label:"Overview",

data:[20,10,5,6],

backgroundColor:[
"#6C63FF",
"#00C49F",
"#FFBB28",
"#FF8042"
]

}]

}

});

const statusChart=document.getElementById("statusChart");

new Chart(statusChart,{

type:"pie",

data:{

labels:["Available","Allocated"],

datasets:[{

data:[12,8],

backgroundColor:[

"#00C49F",

"#6C63FF"

]

}]

}

});