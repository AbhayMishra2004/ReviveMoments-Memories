import { makeStyles } from "@material-ui/core";


export default makeStyles((theme) => (
    {

        container : 
        {
            display : 'flex' , 
            alignItems : 'center' ,
        } , 

        smMargin : 
        {
            margin : theme.spacing(1) ,
        } , 

        actionDiv : 
        {
            textAlign : 'center' , 
        } , 

        load : {
            display : 'flex' , 
            justifyContent : 'center' , 
            alignItems :  'center' , 
            height : '50vh'
        }

}))