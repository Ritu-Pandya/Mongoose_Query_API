import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema(
    {
      employeeName: {
        type: String,
        required: true,
        
      },

      employeeEmail: {
        type: String,
        required: true,
       
      },
     departmentID:{
      type: mongoose.Schema.Types.ObjectId,  
      ref: 'Department'
     }
    },
    { timestamps: true }
  );
  const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;