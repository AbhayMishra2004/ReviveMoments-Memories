import * as api from '../api/index.js' ; 
import { FETCH_ALL, CREATE, UPDATE , DELETE , LIKE , FETCH_BY_SEARCH , START_LOADING , END_LOADING, FETCH_POST , FETCH_BY_CREATOR , COMMENT} from '../constants/actionTypes';
import { toast } from 'react-hot-toast';

/*********************** FOR GET THE POST  ****************************/

// Redux Thunk allows you to dispatch functions as actions instead of plain objects.
// It also takes dispatch as an argument, which is a function provided by Redux for dispatching actions to the store.
export const getPosts = (page) => async(dispatch) => 
{
    try
    {  
        dispatch({ type: START_LOADING });

        // IT IS MAKING API REQUEST TO THE BACKEND 
        const {data} = await api.fetchPosts(page) ; 
        
        // After the data is successfully fetched, it dispatches a Redux action with type FETCH_ALL and passes the fetched data as the payload
        // Inside the action creator, an action is dispatched to the Reducers
        dispatch({type : FETCH_ALL , payload : data}) ; 

         dispatch({ type: END_LOADING });

    } catch(error)
    {
        console.log(error) ; 
    }
}

/*********************** GET POST BY SEARCH ****************************/
export const getPostBySearch =  (searchQuery) => async (dispatch) => 
{
    try {

        dispatch({ type: START_LOADING });

        const {data : {data}} = await api.fetchPostsBySearch(searchQuery) ;
        
        dispatch({type : FETCH_BY_SEARCH , payload : {data}}) ;  

        dispatch({ type: END_LOADING });

    } catch(error)
    {
        console.log(error.message) ;
    }
}

/*********************** GET POST BY ID ****************************/
export const getPost =  (id) => async (dispatch) => 
{
    try {

        dispatch({ type: START_LOADING });

        const {data} = await api.fetchPost(id) ;

        dispatch({type : FETCH_POST , payload : {post : data}}) ;  

        dispatch({ type: END_LOADING });

    } catch(error)
    {
        console.log(error.message) ;
    }
}

/*********************** GET POST OF THE CEEATOR ****************************/
export const getPostsByCreator = (id , history) => async (dispatch) => {

    try {

        dispatch({ type: START_LOADING });

        const {data : {data}} = await api.fetchPostsByCreator(id) ; 

        // console.log(data) ;
        console.log({data}) ;

        dispatch({type : FETCH_BY_CREATOR , payload : {data}}) ;

        history.push(`/creators/${id}`)

        dispatch({type : END_LOADING}) ;

    } catch(error)
    {
        console.log(error) ; 
    }
}


/*********************** FOR CREATING THE POST  ****************************/
export const createPost = (post , history) => async(dispatch) => 
{
    try {

        dispatch({ type: START_LOADING });

        const {data} = await api.createPost(post) ;

        history.push(`/posts/${data._id}`)

       await dispatch({type : CREATE  , payload : data}) ; 

        dispatch({ type: END_LOADING });

    } catch(error)
    {
        console.log(error.message) ; 
    }   
}

/*********************** FOR UPDATING THE POST  ****************************/
export const updatePost = (id , post) => async (dispatch) => 
{
    try{    

        const {data} = await api.updatePost(id , post) ;
        
        dispatch({type: UPDATE , payload:data}) ; 

    } catch(error)
    {
        console.log(error.message) ; 
    }
}

/*********************** FOR DELETING THE POST  ****************************/
export const deletePost = (id) => async (dispatch) => 
{
    try {

         await api.deletePost(id) ; 

        dispatch({type : DELETE , payload : id}) ; 

        toast.success('Post deleted successfully');

    } catch(error)
    {
        console.log(error.message) ; 
    }
}

/*********************** FOR LIKING THE POST  ****************************/
export const likePost = (id) => async (dispatch) => 
{
    const user = JSON.parse(localStorage.getItem('profile')) ; 

    try {
        const {data} = await api.likePost(id , user?.token) ;

        dispatch({type : LIKE , payload : data}) ;
    } catch(error)
    {
        console.log(error.message) ; 
    }
}

/*********************** FOR COMMENT IN THE POST  ***************/

export const commentPost = (value , id) => async (dispatch) => 
{
    try {

        const {data} = await api.comment(value , id) ; 
        
        dispatch({type : COMMENT , payload : data}) ;

        // NEW COMMENTS ARE RETURNING
        return data.comments ; 

    } catch(error)
    {
        console.log(error.message) ; 
    }
}
