const express = require("express");

const router = express.Router()

const {
    createStudent,
    getAllStudent,
    getStudent,
    updateStudent
}= require("../controller/controller");

router.post("/create", createStudent)

router.get("/getall", getAllStudent)

router.get("/getone/:studentId", getStudent)

router.put("/update/:id", updateStudent)

module.exports = router;