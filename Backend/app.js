import express from "express" ;
import dotenv from 'dotenv' ;
import bodyParser from 'body-parser';
import cors from 'cors';
import  authRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';
import userRoute from './routes/users.js';
dotenv.config(); 


const app = express() ;
export const router = express.Router() ;



app.use(cors());
app.use(bodyParser.json());

// for sign up and login
app.use('/auth' , authRoute);
// for performing admin operations
app.use('/admin' , adminRoute);
// for user operations
app.use('/user' , userRoute) ;


app.listen(3000 , ()=>{
  console.log("Server runnning on port 3000");

})