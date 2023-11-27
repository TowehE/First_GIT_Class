const express = require("express");

require("./db/confg");

require("dotenv").config();

const studentRouter = require("./router/router")

const app = express();

app.use(express.json());  

const port = process.env.port

app.use("/api/student/", studentRouter)



app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
});
