const express = require("express");

const router = express.Router()

const {
    createStudent,
    getAllStudent,
    getStudent,
    updateStudent,
    deleteStudent,
}= require("../controller/controller");

router.post("/create", createStudent)

router.get("/getall", getAllStudent)

router.get("/getone/:studentId", getStudent)

router.put("/update/:studentId", updateStudent)

router.delete("/delete/:studentId", deleteStudent)

module.exports = router;