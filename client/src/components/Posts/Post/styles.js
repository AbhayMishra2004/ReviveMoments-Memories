import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => 
({
    card : {
        display : 'flex' , 
        flexDirection : 'column' , 
        justifyContent : 'space-between' , 
        borderRadius : '15px' , 
        height : '100%' , 
        position : 'relative' , 
    } , 

    media : 
    {
        height : 0 , 
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    } , 

    overlay : {
        position : 'absolute' , 
        top : '20px' , 
        left : '20px' , 
        color : 'white' , 
        height : '100' ,
    }  ,
    
     overlay2 : {
        position : 'absolute' , 
        top : '20px' , 
        right : '20px' , 
        color : 'white' , 

        '& .MuiSvgIcon-root': {
             color: 'white',
        },
    }  , 

    // DETAILS
    details : {
        display : 'flex' , 
        justifyContent : 'space-between' , 
        margin : '20px' , 
    } ,

    // TITLE
    title : 
    {
        padding : '0 16px' , 
    } , 

    // CARD ACTIONS 
    cardActions : 
    {
        display : 'flex' , 
        justifyContent : 'space-between' , 
        padding: '0 16px 8px 16px',
    } , 

    // CARD ACTTION FOR BASE BUTTON 
      cardAction : 
    {
        display : 'block' , 
        textAlign : 'initial'
    } , 

    // grid 
    // grid : {
    //     display : 'flex' , 
    // }

    //  border : {
    //     border : 'solid' , 
    // } , 

})) 