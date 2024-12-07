import express from 'express' ;
import { authenticateToken } from '../middleware/authmiddleware.js';
import { PrismaClient } from '@prisma/client';


const prisma =new PrismaClient() ;
const router = express.Router();

router.post('/bookseat' , authenticateToken , async(req , res)=>{
  const{trainId , numberOfSeats } =req.body ; 

  if(!trainId || !numberOfSeats) {
    return res.sendStatus(400) ;
  }
  const userId = req.user.userId;
  console.log(userId);

  try {
   const train =   await prisma.train.findUnique ({
     where : {id : Number(trainId)} ,
   }) ;

   if(!train) {
    return res.status(404).json({message : 'train not found'});
   }

   if(train.seatsAvailable < Number(numberOfSeats)){
    return res.status(400).json({message : 'Sorry , enough seats are not available'});
   }

   const booking  =  await prisma.$transaction(async (prisma)=>{
    const updatedTrain = await prisma.train.update({
      where : {id:Number(trainId)} ,
       data : {
        seatsAvailable : train.seatsAvailable -Number(numberOfSeats) ,
       },
    });

  const newBooking = await prisma.booking.create({
    data : {
      trainId : Number(trainId) , 
      seatsBooked : Number(numberOfSeats) ,
      userId : userId , 
    }
  }) ;

 return newBooking;
   }) ;
   res.status(201).json({message:"seats booked" , booking });
  } catch (err) { 
    console.log(err);
    res.sendStatus(500);
  }
}) ;


router.get('/booking/:id' , authenticateToken , async(req, res) => {
  const {id} = req.params ;
  try {
    const booking  = await prisma.booking.findUnique( {
      where : {id : parseInt(id)} ,
      include: {
        train : true , 
      }, 
    }) ;
    if (!booking || booking.userId !== req.user.userId) {
      return res.status(404).json({ message: 'Either booking not found or unauthorized' });
    }

    res.status(200).json({ message: 'Booking details fetched successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching  details', error });
  }
});



export default router ;