import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import db from "./database/database.js"
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.listen(3001, function(){
    console.log("Listening to port 3001");
});

app.use("/", router);
