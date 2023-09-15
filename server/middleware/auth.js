import jwt from "jsonwebtoken"; 

const secret = 'test' ; 

const auth = async (req , res , next) => 
{
    try { 
        // The code is essentially extracting the token or credentials from the Authorization header of an HTTP request
        const token = req.headers.authorization.split(" ")[1];

        // IF LENGTH IS LESS THAN 500 MEANS IT IS OWN OTHERWISE IT IS FROM GOOGLE AUTH .
        const isCustomAuth = token.length < 500 ; 

        let decodedData ; 

        if(token && isCustomAuth)
        {
            // IT VERIFY TOKEN IS VALID AND NOT EXPIRED 
            decodedData = jwt.verify(token , secret) ; 
            req.userId = decodedData?.id ; 
        }

        else 
        {
           try {
             // IT IS FOR THE GOOGLE AUTH
            // .sub IS SAME FOR GOOGLE ID 
            decodedData = jwt.decode(token) ; 
            req.userId = decodedData?.sub ; 
            
           } catch(error)
           {
            console.log(error) ; 
           }
        }

        next() ; 

    } catch(error)
    {
        console.log(error);
    }
} ;

export default auth ;