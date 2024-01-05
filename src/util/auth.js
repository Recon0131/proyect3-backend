import jwt from 'jsonwebtoken'
import 'dotenv/config' 


export const createJWT  = user =>{
    return jwt.sign(user, process.env.SECRET_KEY,{
        expiresIn: '1d',
    })
}