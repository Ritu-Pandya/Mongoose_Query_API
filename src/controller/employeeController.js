import Department from "../model/department.js";
import Employee from "../model/employee.js";

export const createEmp = async (req, res, next) => {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      return res.status(201).json(employee);
    } catch (error) {
      return res.status(404).send('Not found');
    }
  };

  export const getAllEmpData=async(req,res,next)=>{
    try {
      let employees = await Employee.aggregate([
        {
          $lookup: {
            from: 'departments', 
            localField: 'departmentID',
            foreignField: '_id',
            as: 'department'
          }
        },
        
      ]);
  
      return res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      next(error);
    }
}

export const getAllEmpDataByDept=async(req,res,next)=>{
  try {
    let employees = await Employee.aggregate([
      {
        $lookup: {
          from: 'departments', 
          localField: 'departmentID',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: '$department' 
      },
      {
        $group:{
          _id:"$department._id",
          departmentName: { $first: '$department.departmentName' },
          employees: {
            $push: {
                employeeName: '$employeeName',
                employeeEmail: '$employeeEmail'
            }
        }
        }
      },
      
      
    ]);

    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    next(error);
  }
}