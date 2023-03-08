const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const securepassword = async(password)=>{
    try {
             const passwordhash = await bcrypt.hash(password,10);
             return passwordhash;     
    } catch (error) {
             console.log({message:error});     
    }
}
// const spassword = await helper.securepassword(req.body.password);
const comparepassword = async(password,dbpassword)=>{
    try {
             const checkhash = await bcrypt.compare(password, dbpassword);
             return checkhash;     
    } catch (error) {
             console.log({message:error});     
    }
}
// const verify = await helper.comparepassword(password,user[0].password);
const genrateToken = async(data)=>{
    try {

        let jwtSecretKey = "secretkey";
          
         const token = await jwt.sign({data}, jwtSecretKey);
          return token
                 
    } catch (error) {
             console.log({message:error});     
    }
}
const verifyToken = async(req,res,nexr)=>{
  
    try {
        const bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token;
            next();
            // res.json({token:token})
        }else{
            res.send({
                result:"Token is not valid."
            })

        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    } 
}
module.exports ={
    securepassword,
    comparepassword,
    genrateToken,
    verifyToken
}