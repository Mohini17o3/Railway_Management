import jwt from 'jsonwebtoken' ;
import dotenv from 'dotenv' ;


dotenv.config() ;

const SECRET = process.env.TOKEN_SECRET  ;

export default function rolemiddleware(requiredRole) {
  return (req , res, next)=> {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] ;

    if(!token) {
        return res.sendStatus(401);
    }


    jwt.verify(token , SECRET , (e , decoded)=>{
        if(e) {
            return res.sendStatus(403);
        }


    if(decoded.role != requiredRole) {
        return res.sendStatus(403);
    }
    
    req.user = decoded ; 
    next() ;
  }) ; 

  }
}