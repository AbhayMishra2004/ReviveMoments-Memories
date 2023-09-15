import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE ,FETCH_BY_SEARCH , START_LOADING , END_LOADING , FETCH_POST , COMMENT , FETCH_BY_CREATOR} from '../constants/actionTypes';


/***************** IT IS A COMPLETE ONE REDUCER FUNCTION ***********************/

// ACTION.PAYLOAD IS COMING FROM ACTIONS POSTS 

// POSTS IS A INTIAL VALUE 
export default (state = {isLoading:true , posts : [] , currentPage:1 , numberOfPages:1} , action) => {

    switch(action.type)
    {
        case START_LOADING : 
            return {...state , isLoading:true } ; 
        
        case END_LOADING : 
            return {...state , isLoading:false} ; 
        
        case FETCH_ALL : 
            return {
                ...state , 
                posts : action.payload.data , 
                currentPage : action.payload.currentPage ,
                numberOfPages : action.payload.numberOfPages ,
            } ;

        case FETCH_BY_SEARCH : 
            return {...state , posts : action.payload.data} ; 

        case FETCH_POST : 
            return {...state , post : action.payload.post} ;  // post to posts
        
        case FETCH_BY_CREATOR:
            return {...state , posts : action.payload.data} ;  
        
        case LIKE : 
            return {...state , posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))} ;

        // ISME PREVIOUS POST , THEN NAYI POST KO ADD KAR DO 
        // NEW POST IS STORED IN ACTION.PAYLOAD
        case CREATE : 
            return {...state , posts : [...state.posts , action.payload]} ; 

        // POSTS KO HE RETURB KARNA HAI 
        // BUT UPDATED POST WALE MAI USKE PAYLOAD KO DALNA HAI . 
        case  UPDATE : 
            return {...state , posts : state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))} ; 

        case DELETE : 
            return {...state , posts: state.posts.filter((post) => post._id !== action.payload)};

        case COMMENT:
                return {
            ...state,
            posts: Array.isArray(state.posts) ? state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            }) : state.posts,
        };

        default : 
            return state ; 
    }
}