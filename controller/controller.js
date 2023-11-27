const studentModel = require("../model/model")

//create student
exports.createStudent = async(req,res)=>{
  try{
    const student = await studentModel.create(req.body)
 if(!student){
    res.status(404).json({
        mesaage:"Error creating student"
    })
 }else{
    res.status(201).json({
        mesaage:"Student created successfully",
        data:student
    })
 }
  }catch(error){
    res.status(404).json({
        mesaage:error
    })
} 
}

//get all student

exports. getAllStudent = async(req,res)=>{
  try{
    const student = await studentModel.find()
 if(student.length == 0 ){
    res.status(200).json({
        mesaage:"student database is empty"
    })
 }else{
    res.status(200).json({
        mesaage:"list of all students in this database",
        data:student
    })
 }
  }catch(error){
    res.status(404).json({
        mesaage:error
    })
} 
}


// get a student

exports.getStudent = async(req,res)=>{
  try{
    const studentId = req.params.studentId;
  
    const student = await studentModel.findById(studentId);
 if(!student){
    res.status(404).json({
        mesaage:"student not found"
    })
 }else{
    res.status(200).json({
        mesaage:"student found",
        data:student
    })
 }
  }catch(error){
    res.status(404).json({
        mesaage:error
    })
} 
}

//update a student
exports.updateStudent = async(req,res)=>{
    try{
    //track the user id
    const studentId = req.params.studentId;

    //track the student with the id gotten
    const student = await studentModel.findById(studentId);

    //check for entity and replace with existing data
        const studentData ={
            name:req.body.name ||student.name,
            stack:req.body.stack ||student.stack,
            score:req.body.score ||student.score, 
        };
        //update the student
        const updatedStudent = await studentModel.findByIdAndUpdate(
            studentId, 
            studentData, {
                new: true,
            });
      //checkfor errors
        if (!student){
            res.status(404).json({
                message: `Student with id: ${studentId} is not found`
            });
        }else{
            res.status(200).json({
                message: `Student with id: ${studentId} has been updated`,
                data:updatedStudent,
            });
        }   

    }catch(err){
        res.status(500).json({
            message: err.message});
    } 
}

   