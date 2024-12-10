import jsonwebtoken from 'jsonwebtoken'
const secreteKey=process.env.TOKEN_SECRETE_KEY;
export const generateToken=(id)=>{
    const payload={
        id:id
     }
     const token=jsonwebtoken.sign(payload,secreteKey,{expiresIn:'2d'});
     return token;
}
