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
        message:"Student created successfully",
        data:student
    })
 }
  }catch(error){
    res.status(500).json({
        mesaage:error
    })
} 
}


//get all students
exports. getAllStudent = async(req,res)=>{
  try{
    const student = await studentModel.find()
 if(!student.length == 0 ){
    res.status(404).json({
        message:"student database is empty"
    })
 }else{
    res.status(200).json({
        message:`list of all ${student.length} students in this database`,
        data:student
    })
 }
  }catch(error){
    res.status(404).json({
        message:error
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
        message:"student not found"
    })
 }else{
    res.status(200).json({
        message:"student found",
        data:student
    })
 }
  }catch(error){
    res.status(404).json({
        message:error
    })
} 
}

//update a student
exports.updateStudent = async(req,res)=>{
    try{
    //track the user id
    const studentId = req.params.studentId;
    
    // track student with the id gotten
    const student = await studentModel.findById(studentId);
    // check for error
    if (!student) {
      res.status(404).json({
        message: `Student with id: ${studentId} is not found.`,
      });

    }
      //check for entity and replace with existing data
    const studentData ={
            name:req.body.name || student.name,
            stack:req.body.stack || student.stack,
            score: {
                html: req.body.score.html || student.score.html,
                 javaScript: req.body.score.javaScript || student.score.javaScript,
                css: req.body.score.css || student.score.css,
                node: req.body.score.node || student.score.node,
              },
           
        };
        
        //update the student
        const updatedStudent = await studentModel.findByIdAndUpdate(
            studentId, 
            studentData,    
            
        
         {
                new: true,
            });
      //checkfor errors
        if (!updatedStudent){
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

   //delete the student
   exports.deleteStudent = async(req,res)=>{
    try{
     //track the user id
        const studentId = req.params.studentId;

    //track the student with the ID gotten
    const student = await studentModel.findById(studentId);
//check for errors
if(!student){
    res.staus(404).json({
        message: `student with id ${studentId} has not been found`
    })
}
//delete the student
await studentModel.findByIdAndDelete(studentId);
return res.status(200).json({
    message:`student with id ${studentId} has been deleted`,
    data: student,
})

    }catch(error){
        console.log(error);
    }
   }




   exports.isAdmin = async(req,res)=>{
    try{
        //track the user id
    const adminId = req.params.adminId;
    
    // track admin with the id gotten
    const admin = await studentModel.findById(adminId);
    
    // check for error
    if (!admin) {
      res.status(404).json({
        message: `This is not an admin :${adminId}`,
      });
      return;
    }

      const updateAdmin = {
    isAdmin:req.body.isAdmin||adminId.isAdmin,
      }

  const updatedAdmin = await studentModel.findByIdAndUpdate(
    adminId, 
   { isAdmin:true},
    {new:true}
  )
   
        res.status(200).json({
            message: `Welcome ${adminId}`,
            data: updatedAdmin,
        })
    
    
    
    }catch(error){
        res.status(500).json({
            message:"error"
 
    })
}
}
