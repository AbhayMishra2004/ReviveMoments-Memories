import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { toast } from 'react-hot-toast';



/************************* SIGN IN **********************************/
export const signin = (formData , history) => async (dispatch) => {

    try {

        // API CALL FOR SIGN IN 
        const {data} = await api.signIn(formData) ;
        
        // DISPATCH IT IN ROUTER
        dispatch({type : AUTH , data}) ; 

        history.push('/posts') ; 

        toast.success("login successful") ; 

    } catch(error)
    {
        if(error?.response?.data?.message)
            toast.error(error.response.data.message);
    
        else
            console.log(error);
    }
}

/************************* SIGN UP **********************************/
export const signup = (formData , history) => async (dispatch) => {

    try {
        // API CALL FOR SIGN IN 
        const {data} = await api.signUp(formData) ;

        // DISPATCH IT IN ROUTER
        dispatch({type : AUTH , data}) ; 

        history.push('/posts') ;

        toast.success("login successful") ;

    } catch(error)
    {
        if(error?.response?.data?.message)
            toast.error(error.response.data.message);
    
        else
            console.log(error);
    }
}