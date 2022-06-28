
function validateUser(user){
   let status  ;
   let message  ;
   const mailFormat = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
   const  passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})");
   const userName = user.userName;
   const password = user.password;
   
   if (userName == ""){
        status = false
        message = "username can't be empty"
        return {status,message};
   }
   else if(!mailFormat.test(userName)){
        status = false
        message = "Username is not valid"
        return {status,message};
   }
   
    if (password ==""){
        status = false
        message = "password can't be empty"
        return {status,message};
    }
    // else if(!passwordFormat.test(password)){
        
    //     status = false
    //     message = "password is not valid"
    //     return {status,message};
    // }

        status = true
        message = "Data are validated"
        return {status,message};

   
}

module.exports ={validateUser}