import express from 'express';
import { adminApiKeyMiddleware } from '../middleware/apikeymiddleware.js';
import { authenticateToken } from '../middleware/authmiddleware.js';
import rolemiddleware from '../middleware/rolemiddleware.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router() ;


router.post('/addTrain' , adminApiKeyMiddleware , rolemiddleware("admin") , async(req, res)=>{
  const {trainName ,source , destination , seatsAvailable ,trainNumber , trainType , totalSeats , bookedSeats} = req.body ;
  try {
    const newTrain = await prisma.train.create(
      {
        data : {
          trainName , 
          source , 
          destination, 
          seatsAvailable,
          trainNumber,
          trainType, 
          totalSeats, 
          bookedSeats
        },
      }
    );
    res.sendStatus(201);
  } catch(err) {
    console.log(err) ;
    res.sendStatus(500) ;
  }
})

router.put('/updateSeats/:trainId'  , adminApiKeyMiddleware , rolemiddleware("admin"), async(req , res)=>{
  const {trainId} = req.params ;
  const{seatsAvailable} = req.body;
try {
  const train = await prisma.train.findUnique({
    where: {id : Number(trainId)} ,
  }) ;

 if(!train) {
  return res.sendStatus(404);
 }

 const updatedTrain = await prisma.train.update({
  where: {id : Number(trainId)},
  data: {seatsAvailable},
 }) ;

 res.sendStatus(200) ;

} catch(err) {
  console.error(err) ;
  res.sendStatus(500) ;
}



})


router.delete('/removeTrain/:trainId' , adminApiKeyMiddleware , authenticateToken , rolemiddleware("admin") , async(req , res) => {
  const {trainId} = req.params ; 

  try {
    const train  = await prisma.train.findUnique({
      where : {id : Number(trainId)},
    });

    if(!train) {
      return res.sendStatus(400);
    }
    
    const booking = await prisma.booking.findMany({
      where : {trainId : Number(trainId)},
    }) ;

    if(booking.length >0) {
      return res.status(400).json({message : "bookings are present in this train"});
    }

    await prisma.train.delete({
      where: { id: Number(trainId) },
    });

    res.status(200).json({ message: 'Train removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing train', error });
  }
});

export default router ;