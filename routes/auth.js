const router=require('express').Router();
const bcrypt=require('bcryptjs');  //for hashing passwords
const jwt=require('jsonwebtoken');  //JWT Token
const joi=require('joi');  //for validations - incase of absent frontend validations
const User = require('../model/User');
const { secretKey } = require('../config/db');

    //the validation rules
// const schema= joi.object(
//          {
//         name:joi.string().required().min(6),
//         password:joi.string().required().min(8),
//         email:joi.string().email().required()
//          }
//                         );

router.post('/register',async (req,res)=>
{
    //const {error}=schema.validate(req.body);    //validating
    // res.status(400).send(error.details[0].message)
    
    //check if Email exists in the database (if user already exists)
    const userExist= await User.findOne({email:req.body.email});
    if(userExist) return res.json({'msg':"user exists"});

    //hash passwords
    const salt=await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt); //hashing


    const user=new User(
            {
        name:req.body.name,
        password:hashPassword,
        email:req.body.email
            });

            try
            {
                const savedUser = await user.save();    //saving data of valid user
                return res.json({"msg":"saved","data":savedUser});
            }
            catch(err)
            {
                console.log(err);   //if error
                return res.json({"msg":"error"});
            }
    

});

router.post('/login',async (req,res)=>
{
    //check if Email exists in the database (if user already exists)
    const userExist= await User.findOne({email:req.body.email});
    if(!userExist) return res.json({'msg':"user doen't exists"});

    //checking whether user entered valid password - by using the COMPARE function offered by bcryptjs (coz passwords are hashed)
    const validPass= await bcrypt.compare(req.body.password,userExist.password);
    //if passwords do not match
    if(!validPass) return res.json({"msg":"invalid password"});
    //if OK
        //creating a TOKEN
        const token=jwt.sign({_id:userExist._id},secretKey);
    return res.header('auth_token',token).send({"msg":"LoggedIn","token":token});

});

module.exports=router;