import express from 'express'
import { createEmp, getAllEmpData, getAllEmpDataByDept } from '../controller/employeeController.js';


const employeeRouter = express.Router();

employeeRouter.post("/createEmp",createEmp );
employeeRouter.get("/getEmp",getAllEmpData );
employeeRouter.get("/getEmpByDept",getAllEmpDataByDept );


export default employeeRouter;