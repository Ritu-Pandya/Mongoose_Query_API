import express from 'express'
import { createDepartment } from '../controller/departmentController.js';

const departmentRouter = express.Router();

departmentRouter.post("/createDept", createDepartment);

export default departmentRouter;