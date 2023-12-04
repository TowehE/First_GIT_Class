const express = require("express");

const router = express.Router()

const {
    createStudent,
    getAllStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    isAdmin
}= require("../controller/controller");
const requestInfo = require("../middleware/middlewear");


router.post("/create", requestInfo , createStudent)

router.get("/getall", requestInfo,getAllStudent)

router.get("/getone/:studentId",requestInfo, getStudent)

router.put("/update/:studentId",requestInfo, updateStudent)

router.delete("/delete/:studentId",requestInfo, deleteStudent)

router.put("/isadmin/:adminId",requestInfo, isAdmin)

module.exports = router;