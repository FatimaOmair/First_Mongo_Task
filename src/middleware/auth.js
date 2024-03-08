import jwt from "jsonwebtoken";

const auth=async(req,res,next)=>{
   try{
    const { authorization } = req.headers;
    if(!authorization.startsWith(process.env.BERERTOKEN)){
        return res.json({message:"Not auth user"})
    }
    const token = authorization.split(process.env.BERERTOKEN)[1 ];
   
    if(!authorization){
      return res.json({message:"token is required"})
    }
    const decode = await jwt.verify(token, process.env.LOGINTOKEN);
    req.userId=decode.id;
   
    next();
   }catch (err) {
    return res.json({message:"error",err:err.stack})
   }
}

export default auth;