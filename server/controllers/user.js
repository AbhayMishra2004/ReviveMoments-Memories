import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import User from "../models/user.js"; 

const secret = 'test' ; 


/***********************SIGN IN  **************************/
export const signin = async (req ,res) => {

    const {email , password} = req.body ; 
 
    try {

        // IF USER ALREDAY EXIST OR NOT 
        const oldUser = await User.findOne({email}) ;

        if(! oldUser) 
            return res.status(404).json({message : "User Does not Exist. Please check your email."}) ;
                

        // PASSWORD IS CORRECT OR NOT 
        const isPasswordCorrect = await bcrypt.compare(password , oldUser.password) ; 

        if(! isPasswordCorrect) 
            return res.status(400).json({message : "Invalid credintals"}) ;        

        // GENRATE JWT TOKEN 
        const token = jwt.sign({email:oldUser.email , id:oldUser._id} , secret , {expiresIn : '1h'}) ; 

        res.status(200).json({result : oldUser , token}) ;

    } catch(error)
    {
        res.status(500).json({message : "Something went wrong"}) ;
    }
}

/***********************  SIGN UP **************************/
export const signup = async (req ,res) => {

    const {email, password, confirmPassword ,  firstName, lastName } = req.body;

    try {
        // OLD USER IF EXIST 
        const oldUser = await User.findOne({email}) ; 

        if(oldUser) return res.status(400).json({message : 'user already exist . Please sign in.'}) ; 

        // IF PASSWORD AND CONFIRM PASSWORD NOT MATCH 
        if(password !== confirmPassword)
            return res.status(400).json({message : 'Password not matched'}) ;

        // HASH PASSWORD WITH BCRYPT 
        const hashedPassword = await bcrypt.hash(password , 10) ; 

        const result = await User.create({email , password : hashedPassword , name: `${firstName} ${lastName}`}) ; 

        // GENRATE JWT TOKEN 
        const token = jwt.sign({email: result.email , id: result._id} , secret , {expiresIn:'1h'}) ; 

        res.status(200).json({result , token}) ;

    } catch(error)
    {
        res.status(500).json({message : "Something went wrong"}) ;
    }
}
