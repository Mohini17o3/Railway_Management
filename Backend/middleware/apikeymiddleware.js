import dotenv from 'dotenv' ;
dotenv.config() ;

const adminApi = process.env.API_KEY  ;


export  const adminApiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] ;

     if(!apiKey || apiKey !== adminApi) {
        return res.sendStatus(403) ;
     }
     next() ;
}


