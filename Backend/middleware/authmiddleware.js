import dotenv from 'dotenv' ;
import jwt from 'jsonwebtoken' ;

dotenv.config() ;

const SECRET =  process.env.TOKEN_SECRET;

export function authenticateToken (req , res , next) {
    const authHeader =  req.headers['authorization'] ;
     const token =  authHeader && authHeader.split(' ')[1] ;

     if(token == null ) {
        return res.sendStatus(401) ;

     }
     jwt.verify(token , SECRET , (err , user)=>{
      console.log('JWT verification result:', err, user); 
      
      if(err) {
            return res.sendStatus(403) ;

        }

        req.user = user ;

        next(); 
     })
}
