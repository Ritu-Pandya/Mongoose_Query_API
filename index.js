import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import employeeRouter from './src/routes/employeeRoutes.js';
import departmentRouter from './src/routes/departmentRoutes.js';

const port  = 5002;


const app = express();
app.use(cors());

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Invalid JSON:', err.message);
      return res.status(400).send('Invalid JSON');
    }
    next();
  })
app.get("/", (req, res) => {
    res.json({ message: "Welcome to My application." });
  });

  mongoose
  .connect("mongodb://127.0.0.1:27017/complexQueryDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  }).then(y=>{
    console.log("connect DB")
})
.catch((error) => {
    console.log(error);
})

app.use("/api/employee",employeeRouter);
app.use("/api/department",departmentRouter);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).send('Internal Server Error');
  });
const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === true || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port } = server.address();
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${port}/`);
});