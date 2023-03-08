const express = require('express');
const bodyPaser = require('body-parser');
const user_route = express();
const helper =  require('../helper/helper');


user_route.set('view engine','ejs');
user_route.set('views','./views/users');
user_route.use(bodyPaser.json());
user_route.use(bodyPaser.urlencoded({extended:true}));

// for file upload
// path.join(__dirname,'../public/usersImages')
const multer = require('multer');
const path = require('path');
console.log(__dirname,path.join(__dirname,'../public/usersImages'),"pwd");



// const storage = multer.diskStorage({
//     distination:function(req,file,cb){
//         cb(null,'./usersImages');
//     },
//     filename:function(req,file,cb){
//         const name = Date.now()+'-'+file.originalname;
//         cb(null,name);

//     }
// });
// const upload = multer({storage:storage});
// // for file upload
// user_route.use(express.static(__dirname + '/public'));  
// user_route.use('/usersImages', express.static('usersImages'));
// --------------

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
    //   cb(null, file.originalname)
    const name = Date.now()+'-'+file.originalname;
      cb(null,name)
    }
})

var upload = multer({ storage: storage })

// user_route.use(express.static(__dirname + '../public'));  
// user_route.use('/uploads', express.static('uploads'));








const userController = require('../controllers/userController');


user_route.get('/getalluser',userController.getalluser);
user_route.get('/registration',userController.loadRegitration);
user_route.post('/registration', upload.single('image'),userController.regitration);
user_route.post('/login',helper.verifyToken,userController.loginUser);


const verifyToken = async(req,res)=>{
  
  try {
      const bearerHeader = req.headers["authorization"];
      if(typeof bearerHeader !== 'undefined'){
          const bearer = bearerHeader.split(" ");
          const token = bearer[1];
          req.token = token;
          
          // next();
      }else{
          res.send({
              result:"T oken is not valid."
          })
      }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  } 
}

module.exports=user_route;