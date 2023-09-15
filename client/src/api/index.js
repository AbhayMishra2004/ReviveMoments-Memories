import axios from 'axios' ; 

// YAH BASE URL KO CREATE KAR DIYA 
const API = axios.create({baseURL : 'http://localhost:5000'}) ; 

// SARI REQUEST KE CALL HONE PER PEHLE YAH CALL HOGA . 
// YAH MIDDLEWARE WALE AUTH KO VALUE DEGA 
// This line is defining an Axios request interceptor using the .use() method. This interceptor will be triggered before each HTTP request is made using the API instance . 
API.interceptors.request.use((req) => {

    if(localStorage.getItem('profile'))
    {
        // The JWT is then added to the "Authorization" header using the Bearer scheme.
       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req ; 
})

// FOR FETCHING ALL THE THE POST 
export const  fetchPosts =  (page)  =>  API.get(`/posts?page=${page}`) ;

// FETCH POST BY SEARCH 
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`) ; 

// FETCH POST BY CREATOR
// Frontend API file
export const fetchPostsByCreator = (id) => API.get(`/posts/creator/${id}`);

// FETCH POST BY ID 
export const fetchPost = (id) => API.get(`/posts/${id}`) ; 

// FOR POSTING THE DATA IN THE DATA BASE 
export const createPost = async (newPost) => await API.post('/posts' , newPost) ; 

// FOR UPDATING THE DATA 
export const updatePost = async (id , updatedPost) => await API.patch(`/posts/${id}` , updatedPost) ;

// FOR DELETING A POST 
export const deletePost = async (id) => API.delete(`/posts/${id}`) ; 

// FOR LIKING THE POST 
export const likePost = async (id) => API.patch(`/posts/${id}/likePost` , id) ; 

// FOR COMMENITING THE POST 
export const comment = async (value , id) => API.post(`/posts/${id}/commentPost` , {value}) ; 


// FOR SIGN IN AND SIGN UP
export const signIn = (formData) => API.post('/user/signin' , formData) ; 
export const signUp = (formData) => API.post('/user/signup' , formData) ; 