const { v4: uuidv4 } = require('uuid');
function validateUser(req,res,next){
   
   let message  ;

   const user ={
     userName:req.body.userName,
     password : req.body.password,
     userType : req.body.userType,
     phone_number : req.body.phone_num,
     address : req.body.address,
     name : req.body.name,
     user_id : uuidv4()
     }



   const mailFormat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
   const  passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})");
   const userName = user.userName;
   const password = user.password;
   const  phone_number = user. phone_number;
   const address = user.address;

   if (userName == ""){
        
        message = "username can't be empty"
        return res.status(400).send(message)
   }
   else if(!mailFormat.test(userName)){
        
        message = "Username is not valid"
        return res.status(400).send(message)
   }
   
    if (password ==null){
        
        message = "password can't be empty"
        return res.status(400).send(message)
    }
    
    // else if(!passwordFormat.test(password)){
        
    //     status = false
    //     message = "password is not valid"
    //     return {status,message};
    // }

    if(phone_number == null){
    
     message = "phone number can't be empty"
     return res.status(400).send(message)
    }else if( phone_number.length != 10) {
    
     message = "phone number must have 10 digits"
     return res.status(400).send(message)
    }else if (isNaN(phone_number)){
     
     message = "phone number must cantain only digits"
     return res.status(400).send(message)
    }

    if(address == ""){
     
     message = "address can't be empty"
     return res.status(400).send(message)
    }

        
        message = "Data are validated"
        req.user = user;
        next();
        

   
}

module.exports ={validateUser}