import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Taks lists
var dailyTaskList = [];
var workTaskList = [];

//Time variables
var today= "";
var year = "";

app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    //Find today's date
    var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = (objToday.getDate() < 10 ? '0' + objToday.getDate() : objToday.getDate()) + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()];
    today = dayOfWeek + ", " + dayOfMonth + " of " + curMonth;

    //Find current year
    year = new Date().getFullYear();
    res.locals.year = year;
    res.locals.today = today;
    res.render("dailytasks.ejs", { dailyTaskList: dailyTaskList, today: today, year: year });
});


app.post("/", (req, res) => {
    const newTask = req.body.dailytask;
    dailyTaskList.push(newTask);
    console.log(dailyTaskList);
    res.redirect("/");
});

app.get("/worktasks", (req, res) => {
    res.render("worktasks.ejs", { workTaskList: workTaskList, today: today, year: year});
});

app.post("/worktasks", (req, res) =>{
    const newTask = req.body.task;
    workTaskList.push(newTask);
    console.log(workTaskList);
    res.redirect("/worktasks");
});

app.post("/deleteTask", (req, res) => {
    const taskIndex = req.body.taskIndex;
    workTaskList.splice(taskIndex, 1);
    res.redirect("/worktasks");
});


app.post("/deleteDailyTask", (req, res) => {
    const taskIndex = req.body.taskIndex;
    dailyTaskList.splice(taskIndex, 1);
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });