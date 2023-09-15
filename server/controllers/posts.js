import express from 'express' ; 
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const router = express.Router() ; 


/********* CONTROLLER TO GET ALL THE POST  ************/
export const getPosts = async (req , res) => 
{
    const {page} = req.query ; 

    try{

        // MAX LIMIT IN ONE PAGE 
        const LIMIT = 8 ;   

        // GET STARTING INDEX OF EVERY PAGE 
        const startIndex = (Number(page) - 1) * LIMIT ;
        
        // COUNT TOTAL POST 
        const total = await PostMessage.countDocuments({}) ;
        
        // FINING POST FOR THAT PAGE 
        // This code fetches a limited number of posts (determined by LIMIT) from the PostMessage collection in MongoDB, starting from a specified index (determined by startIndex), while ensuring the posts are sorted by their _id field in descending order (newest first).
        const posts = await PostMessage.find().sort({_id : -1}).limit(LIMIT).skip(startIndex) ; 

        // DATA CURRENT PAGE AND TOTAL PAGE KO RETURN KAREGA 
        res.status(200).json({data : posts , currentPage : Number(page) , numberOfPages : Math.ceil(total / LIMIT)}) ;

    } catch(error)
    {
        res.status(400).json({message : error.message}) ; 
    }
}

/********* CONTROLLER TO GET POST BY SEARCH  ************/
export const getPostBySearch = async (req , res) => 
{
    // REQ PARAMS SE HUMKO TAG NIKALANA HAI 
    const {searchQuery , tags} = req.query ; 

    try{
        // This is a RegExp constructor, 
        // It stands for "case-insensitive." 
        // When you include the "i" flag, the regular expression will match text regardless of whether it's in uppercase or lowercase.
        const title = new RegExp(searchQuery , "i") ; 

        // $OR MEANS DONO MAI SE KOI AIK BHI HO TO CHALEGA 
        // $IN looking for documents where the "tags" field contains one or more values that are present in an array
        const posts = await PostMessage.find({$or : [{title} , {tags : {$in : tags.split(',')}}]}) ; 

        res.json({data : posts}) ; 

    } catch(error)
    {
        res.status(400).json({message : error.message}) ; 
    }
}

/********* CONTROLLER TO GET POST ALL BY THE CREATOR ************/
// Controller in Backend
export const getPostsByCreator = async (req, res) => {

  const { id } = req.params; 

  try {
    const posts = await PostMessage.find({ creator: id });

    res.json({ data: posts });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};



/********* CONTROLLER TO GET POST BY ID ************/
export const getPost = async (req , res) => 
{
    const {id} = req.params ; 

    try {

        const post = await PostMessage.findById(id) ; 

        res.status(200).json(post) ; 

    } catch(error)
    {
        res.status(404).json({message : error.message}) ; 
    }
}


/********* CONTROLLER TO CREATE  THE POST  ************/
export const createPost = async (req , res) => 
{
    console.log("post creating");

    const post = req.body ; 

    const newPost = new PostMessage({...post , creator : req.userId , createdAt : new Date().toISOString()}) ; 

    try {
        await newPost.save() ;

        res.status(201).json(newPost) ;  

    } catch(error)
    {   
        res.status(409).json({message : error.message}) ; 
    }
}

/********* CONTROLLER TO UPDATE THE POST  ************/
export const updatePost = async (req, res) => {
    console.log("post updating");

    // Extract data from the request
    const { id } = req.params;
    const { creator, title, message, tags, selectedFile } = req.body;

    // Check if ID is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(401).send(`No post with id: ${id}`);

    // Create an object with the updated data
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    // Update in the database and return the updated document
    try {
        const updatedDocument = await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

        // Check if the document was found and updated
        if (!updatedDocument) {
            return res.status(404).send(`No post found with id: ${id}`);
        }
        
        // Send the updated document as JSON response
        res.json(updatedDocument);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the post' });
    }
};

/********* CONTROLLER TO DELETE THE POST  ************/
export const deletePost =  async (req , res) => {

    const {id} = req.params ;

    if(! mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send('No Post found') ; 

    await PostMessage.findByIdAndRemove(id) ; 

    res.json({message : "Post deleted successfully"})  ; 
}

/**************** CONTROLLER TO LIKE THE POST  **********************/
export const likePost = async (req , res) => {

    const {id} = req.params ; 

    // YAH AUTH SECTION SE AARA 
    // CHECK KAR RA HAI KI ID HAI YAA NAHI
      if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // POST KO FIND KARENGE 
    const post = await PostMessage.findById(id);

    // post.likes is an array containing user IDs of users who have liked the post
    const index = post.likes.findIndex((id) => id ===String(req.userId));
    
    // AGAR PEHLE SE LIKE NA HO TO 
      if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // THIS IS UPDATED POST AFTER MANGING LIKES
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

/**************** CONTROLLER TO COMMENT THE POST  **********************/
export const commentPost = async (req , res) => {

    const {id} = req.params ; 
    const {value} = req.body ; 

    try {
        
        const post = await PostMessage.findById(id) ; 
        
        // Check if the post is found
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push(value) ; 

        const updatedPost = await PostMessage.findByIdAndUpdate(id , post , {new : true}) ; 

        res.json(updatedPost) ; 

    } catch(error)
    {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the comments' });
    }
}

export default router ; 