const express = require("express");

const router = express.Router()

const {
    signUp,           
    login,
    getAllUsers,
    scoreUpdate,
    signOut,
    getOne
    // createStudent,
    // getAllStudent,
    // getStudent,
    // updateStudent,
    // deleteStudent,
    // isAdmin
}= require("../controller/controller");

const {authenticate, admin }= require("../middleware/autheticate");

router.post("/sign-up" , signUp)


router.post("/log-in" , login)


router.get("/getOne", authenticate, getOne)


router.get("/getAll", admin, getAllUsers)

router.put("/update/:id", admin, scoreUpdate)


router.post("/logout", authenticate,signOut)





// router.post("/create", requestInfo , createStudent)

// router.get("/getall", requestInfo,getAllStudent)

// router.get("/getone/:studentId",requestInfo, getStudent)

// router.put("/update/:studentId",requestInfo, updateStudent)

// router.delete("/delete/:studentId",requestInfo, deleteStudent)

// router.put("/isadmin/:adminId",requestInfo, isAdmin)

module.exports = router;