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
    res.status(404).json({
        mesaage:error
    })
} 
}


//get all students
exports. getAllStudent = async(req,res)=>{
  try{
    const student = await studentModel.find()
 if(student.length == 0 ){
    res.status(200).json({
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
    const studentId = req.params.toweh;
    
    // track student with the id gotten
    const student = await studentModel.findById(studentId);
    // check for error
    if (!student) {
      res.status(404).json({
        message: `Student with id: ${studentId} is not found.`,
      });
      return; 
      // Missing return statement added
    }

    // check for entity and replace with existing data
    const scores = req.body.score ;

    const prevScores = {
      html: student.score.html,
      javaScript: student.score.javaScript,
      css: student.score.css,
      node: student.score.node,
    };

     
      //check for entity and replace with existing data
    const studentData ={
            name:req.body.name || student.name,
            stack:req.body.stack || student.stack,
            score: {
                html: scores.html || prevScores.html,
                 javaScript: scores. javaScript || prevScores. javaScript,
                css: scores.css || prevScores.css,
                node: scores.node || prevScores.node,
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
await studentModel.findByIdAndDelete(student);
return res.status(200).json({
    message:`student with id ${studentId} has been deleted`,
    data: student,
})

    }catch(error){
        console.log(error);
    }
   }