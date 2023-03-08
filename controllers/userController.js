const helper =  require('../helper/helper');
const User =  require('../Models/userModel');
const bcrypt =  require('bcrypt');
// const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const securePassword = async(password)=>{
  try {
    const hashpassword = await bcrypt.hash(password,10);
    return hashpassword;
    
  } catch (error) {
    console.log(error.message);
  }
}

const getalluser =async (req,res)=>{
  try {
    const user  = await User.find({});
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
}

const loadRegitration = async(req,res)=>{
   try {
    res.render('registration');
   } catch (error) {
    console.log(error.message);
   }
}

const regitration = async(req,res)=>{
    try {
   const spassword = await securePassword(req.body.password);
       console.log(req.file.filename,'imagsss');
     const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:spassword,
        mobile:req.body.mobile,
        image:req.file.filename,
        is_admin:0
     });
     const userData = await user.save();

        if(userData){
            res.render('registration',{message:"Your registration has been successfully. Please verify your mail."});
        }else{
            res.render('registration',{message:"Failed!"});
        }
    } catch (error) {
     console.log(error.message);
    }
 };

const loginUser =async (req,res)=>{
  try {
console.log('loginUser');
    const email= req.body.email;
    const password= req.body.password;
    const user  = await User.findOne({email:email});
      if(user){   
        const verify = await helper.comparepassword(password,user.password);
            if(verify){
            const token = await helper.genrateToken(user);
            jwt.verify(req.token,secretKey,(err, authData)=>{
              if(err){
                res.send({result:"invalid token"});
              }else{
                console.log('oooook');
                  res.json({
                    message:"profile accessed",
                    authData
                  })
              }
            })
            // const verifyToken = await helper.verifyToken(req,res)
            // console.log("verifyToken",verifyToken);
              // res.send(verifyToken)
              // res.json(verifyToken);
              // next();
            }else{
              res.send("User account does not verify...")
            }
        }else{
          req.send({message:"Acount does not exits."}) 
        }

  } catch (error) {
    console.log(error);
  }
}



module.exports={
    loadRegitration,
    regitration,
    loginUser,
    getalluser
};