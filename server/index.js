import express from 'express' ; 
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors' ; 
import dotenv from 'dotenv' ; 


const app = express() ; 
import postRoutes from './routes/posts.js' ;
import userRoutes from './routes/user.js' ;

dotenv.config() ; 

// MIDDLEWARE 
// bodyParser.json() is a middleware provided by the body-parser library .  It is used to parse the JSON data in the request body.
app.use(bodyParser.json({limit : '30mb' , extended : true})) ; 

// This line sets up middleware to parse incoming HTTP requests with URL-encoded payloads.
app.use(bodyParser.urlencoded({limit : '30mb' , extended : true})) ; 

// This line sets up Cross-Origin Resource Sharing (CORS) middleware for your Express.js application.
app.use(cors()) ; 


// USING THE ROUTES
// BASE URL THEN /POSTS THEN ROUTES 
app.use('/posts' , postRoutes) ; 
app.use('/user' , userRoutes) ; 


const PORT = process.env.PORT ||  8000 ; 

app.get("/" , (req , res) => {
    res.send("Server Side is running") ; 
})


mongoose.connect(process.env.CONNECTION_URL , {
     useNewUrlParser: true, 
    useUnifiedTopology : true ,
})
.then(() => app.listen(PORT , () => console.log(`Server running on port ${PORT}`)))
.catch((error) => console.log(`${error}`)) ; 

 