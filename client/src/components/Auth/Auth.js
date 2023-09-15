import React , {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles' ; 
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
import { useHistory } from 'react-router-dom';

 


export default function Auth() {

  const initialData = {firstName:'' , lastName:'' , email:'' , password:'' , confirmPassword:''} ; 

  const classes = useStyles() ; 
  const dispatch = useDispatch(); 
  const history = useHistory() ; 
  const [isSignup , setIsSignup] = useState(true) ;
  const [showPassword , setShowPassword] = useState(false) ;
  const [form , setForm] = useState(initialData) ; 
  
  // HANDLE SHOW PASSWORD FUNCTUON 
  const handleShowPassword = () => setShowPassword(! showPassword) ; 
  

  // FUNCTION SWITCH MODE 
  // SWITCH FROM SIGN UP TO SIGN IN AND REVERSE 
  const switchMode = () =>{
    setForm(initialData) ; 
    setIsSignup(! isSignup) ; 
    setShowPassword(false) ; 
  } 

  // HANDLE CHANGE FUNCTION 
  const handleChange = (e) => {
    setForm({...form , [e.target.name]:e.target.value}) ;
  }

  // ON SUBMISSION OF THE FORM
  const handleSubmit = (event) => {

    event.preventDefault() ; 

    // IF SIGN UP CALL
    if(isSignup)
      dispatch(signup(form , history))

    // IF SIGN IN CALL 
    else
      dispatch(signin(form , history))

  }
  

  return (

    // MAIN CONTAINER
    <Container component="main" maxWidth="xs">

      {/* MAIN FOR THE CARD */}
      <Paper elevation={6} className={classes.paper}>

        {/* LOCK OUTLINED ICON */}
        <Avatar className={classes.avatar}> 
          <LockOutlinedIcon />
        </Avatar>

        {/* TEXT  */}
        <Typography component="h1" variant="h5"> {isSignup ? 'Sign up' : 'Sign in'} </Typography>

        {/* FORM */}
        <form className={classes.form} onSubmit={handleSubmit}>

         <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half ></Input>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half></Input>
                </>
              )
            }

            {/* EMAIL AND PASSWORD IN BOTH CASE  */}
            <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

            {/* CONFIRM PASSWORD */}
            {
              isSignup && (
                <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type="password" />
              )
            }
          </Grid>

          {/* BUTTON OF SIGN IN AND UP */}
          <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          {/* CHANGE FROM SIGN UP TO SIGN IN BUTTON */}
          <Grid container justifyContent="flex-end">
            <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Alreday Have an Account ? Sign In' : "Dont't Have an Account ? Sign Up"}
                </Button>
            </Grid>
          </Grid>
       </form>
      </Paper>
    </Container>
 
  )
}
