import React , {useState , useEffect} from 'react'
import {AppBar , Typography , Toolbar , Button , Avatar} from '@material-ui/core';
import useStyle from './styles'
import {Link , useHistory ,useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux' ; 
import {LOGOUT} from '../../constants/actionTypes';
import decode from 'jwt-decode' ; 
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';


export default function Navbar() {

    const classes = useStyle() ; 
    const history = useHistory() ; 
    const dispatch = useDispatch() ; 
    const location = useLocation() ;

    // PROFILE KO FIND KARENGE 
    // KYUKI YAH LOCAL STORAGE MAI PROFILE NAAM SE SET KIYA THA REDUCER MAI 
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile'))) ; 


    // LOGOUT FUNCTION 
    const logout = () => {
        dispatch({type : LOGOUT})  ;
        history.push('/') ;
        setUser(null) ; 
    }

    // JAB BHI LOCATION CHANGE HOGI TO AISA HOGA 
    //  /AUTH SE / MAI JAYEHA ISLIYE 
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile'))) ; 
    }, [location])

    // JWT TOKEN EXPIRE CHECK KARNE KE LIYE 
    // HAR BAAR LOCATION CHANGE HONE PER CHECK KAREGA 
    useEffect(() => {

        const token = user?.token ; 

        if(token)
        {
            const decodedToken = decode(token) ; 
            if(decodedToken.exp * 1000 < new Date().getTime())
                logout() ; 
        }
        // setUser(JSON.parse(localStorage.getItem('profile')));
        
        // eslint-disable-next-line
    } , [location , logout , user?.token]) //LOGOUT , USER.TOKEN KO WARNING HATANE KE LIE DALA HAI 
    

  return (
      <AppBar position="static" color="inherit" className={classes.appBar}>
        
        <Link to='/posts' className={classes.brandContainer}>

            <img src={memoriesText} className={classes.heading} alt="icon" height="45px"/>

            <img src={memoriesLogo} alt="icon" height="40px" className={classes.image} />
        </Link>

        {/* TOOLBAR */}
        <Toolbar className={classes.toolbar}>
            {
                user ? (
                    <div className={classes.profile}>
                        {/* AVTAR */}
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>

                        {/* NAME OF THE USER */}
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>

                        {/* LOG OUT BUTTON  */}
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout </Button>
                    </div>
                ) :     
                (
                    <Button component={Link} to="/auth" variant="contained" color="primary"> Sign IN</Button>
                )
            }

        </Toolbar>
        
      </AppBar>
  )
}
