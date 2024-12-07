// sign up anf login 

import express from 'express' ;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt' ;
import { PrismaClient } from '@prisma/client';




const prisma = new PrismaClient() ;
const SECRET  = process.env.TOKEN_SECRET ; 
const  router = express.Router() ;


router.post('/signUp' , async(req , res)=>{
  
    const {name , username , role , password}  = req.body ;

    try {
        const existingUser = await prisma.user.findUnique({
            where : {username} ,
        });

        if(existingUser) {
            return res.status(400).json({message : 'Email already exists'});
        }
        const hashedPassword = await bcrypt.hash(password , 10);

        // after hashing password , store the details 

        const user = await prisma.user.create({
            data: {
                name , username , password :hashedPassword , role: role || 'user', 
            }, 
        }) ;

        res.sendStatus(201);

    } catch(error){
        console.log(error) ;
        res.sendStatus(500);
    }



})


router.post('/login' , async(req, res) => {
    const {username , password} = req.body ;

    try {
        const user = await prisma.user.findUnique( {
            where : {username} ,
        }) ;

        if(!user) {
            return res.sendStatus(400) ;

        }

        const isPasswordCorrect  = await bcrypt.compare(password , user.password) ; 
        if(!isPasswordCorrect) {
            return res.status(401).json({message : "invalid password"}) ;
        }
       // if credentials are correct , attach the token 


       const token =  jwt.sign({
        userId : user.id , role :user.role
       } ,SECRET, {expiresIn : '1h'} );
     
       console.log(token);
       res.status(200).json({ message: "Login successful", token });
        
    } catch(err) {
        console.error(err);
        res.sendStatus(500) ;
    }
})



export default router ;




