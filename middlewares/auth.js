import jwt from "jsonwebtoken";
// import { model } from "mongoose";

 const authMiddleware = async(req,res,next) => {
    const {token} = req.headers;
    console.log(token);

    if(!token){
        return res.json({success:false, message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id;
        console.log(token_decode.id);
        console.log(req.body.userId);
        next();
    } catch (error) {
        console.log(error,"Auth problem");
        res.json({success:false, message:"Error"})
    }
}

// export const admin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//       next();
//     } else {
//       res.status(401).json({ message: 'Not authorized as admin' });
//     }
//   };

export default authMiddleware;