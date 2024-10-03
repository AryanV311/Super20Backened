import express from "express";
import { addfood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer"

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination:  function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}`)
    }
  })

const upload =  multer({ storage })  

foodRouter.post('/add', upload.single("image"), addfood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)



export default foodRouter;
