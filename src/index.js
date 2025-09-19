import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import db from "./database/database.js"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Listening to port 3000");
});

app.use("/", router);
