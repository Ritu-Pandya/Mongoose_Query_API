import Department from "../model/department.js";


export const createDepartment = async (req, res, next) => {
    try {
      const department = new Department(req.body);
      await department.save();
      return res.status(201).json(department);
    } catch (error) {
      next(error);
    }
  };

  export const getAllDeptData=async(req,res,next)=>{
    try {
        const departmentlist = await Department.find({});
        return res.status(200).json(departmentlist);
      } catch (error) {
        next(error);
      }
}


