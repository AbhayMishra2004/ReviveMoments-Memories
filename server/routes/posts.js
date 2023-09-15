import express from 'express' ; 
const router = express.Router() ; 
import { getPosts , createPost , updatePost , deletePost , likePost , getPostBySearch , getPost , commentPost , getPostsByCreator } from '../controllers/posts.js';
import auth from '../middleware/auth.js'


router.get('/' ,  getPosts) ; 

router.get('/search' , getPostBySearch) ;

router.get('/:id' , getPost) ;

router.get('/creator/:id', getPostsByCreator);

router.post('/', auth , createPost);

// PATCH IS USED FOR UPDATE POST 
router.patch('/:id' , auth , updatePost)

// DELETE A POST 
router.delete('/:id' , auth , deletePost) ; 

// LIKE A POST  
router.patch('/:id/likePost' , auth , likePost) ; 

// COMMENT ON POST 
router.post('/:id/commentPost' , commentPost) ; 

export default router ; 