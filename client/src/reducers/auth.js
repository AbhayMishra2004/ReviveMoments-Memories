import { AUTH , LOGOUT } from "../constants/actionTypes"; 


const authReducer = (state = {authData : null} , action) => {

    switch(action.type) {

        // SAMAJH MAI NAHI AAYA YAH ABHI KE LIYE 
        case AUTH : 
            localStorage.setItem('profile' , JSON.stringify({...action?.data})) ; 
            return {...state , authData : action.data , loading:false , errors:null} ; 
        
        case LOGOUT : 
            localStorage.clear() ;
            return {...state , authData : null , loading:false, errors:null} ; 

        default : 
            return state ; 
    }
}

export default authReducer;