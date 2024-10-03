
import userModel from "../models/userModel.js";

//? Add to user Cart 
const addToCart = async(req,res) =>{
    try {
        const userData = await userModel.findOne({_id:req.body.userId});
        console.log(userData);
        const cartData = await userData.cartData;
        console.log(cartData);

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added To Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//? Remove From user Cart
const removeFromCart = async(req,res) => {
    try {
    let userData = await userModel.findOne({_id:req.body.userId});
    // console.log(userData);
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId] > 0){
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success:true, message:"Removed From Cart"});
} catch (error) {
    console.log(error);        
    res.json({success:false,message:"Error!"})
}
}

//? fetch user cart data
const getData = async(req,res) => {
    try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = userData.cartData;
    res.json({success:true,cartData});
         
} catch (error) {
        res.json({success:false,message:"Error"});
}
}

export { addToCart, removeFromCart, getData}