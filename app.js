const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food"];
let workItems = [];

app.get("/", function (req, res) {
    let day = date.getDay();
    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    }else {
            items.push(item);
            res.redirect("/");
        }; 
});

app.get("/work", function (req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Listening to port 3000");
});
