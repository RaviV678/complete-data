import * as React from 'react';
// import SignIn from './SignIn';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const theme = createTheme();

export default function SignUp({onClose}) {

const [InpVal , setInpVal]=useState({firstName: "", lastName:"", email:"",password:"",confirmpassword:""})
const [error , setError]=useState({firstName: "", lastName:"",email:"",password:"",confirmpassword:""})
const userChange=(event)=>{
{/* console.log(event.target.value);*/}
  const {name , value}= event.target
  setInpVal({...InpVal,[name]:value})
}
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("data",InpVal);
    const formError= {};
  const emailptrn=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const namePttrn=/^[a-zA-Z0-9]{2,20}$/;

  let str=InpVal.email.match(emailptrn);
  let str2=InpVal.firstName.match(namePttrn);   
  let str3=InpVal.lastName.match(namePttrn); 
  let str4=InpVal.password;
  let str5=InpVal.confirmpassword;
  
//  debugger; 
  if(!str){
   formError.email="email is not valid"
  }
  if(!str2){
    formError.firstName="First name is require";
  }
  if(!str3){
    formError.lastName="Last name is require";
  }
  if(!str4){
    formError.password="password is require";
  }
  if(!(str5===str4)){
    formError.confirmpassword="password did not matched";
    
  }
   else if(str && str2 && str3 && str4 && (str5===str4)){
    const frontData= InpVal;
    console.log('front',frontData);
    axios.post('http://localhost:8000/students',frontData)
    onClose();
    Swal.fire({
      icon:"Success",
      title:"Success",
      text:"Successfull Signup"
    }).then(function() {
      window.location = "/SignIn"})
   }

   setError(formError)


  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  onChange={userChange}
                  autoFocus
                />
                <p style={{color:"red" , fontSize: '1rem'}}>{error.firstName}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  onChange={userChange}
                  autoComplete="family-name"
                />
                <p style={{color:"red", fontSize: '1rem'}}>{error.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required ='this field is require'
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={userChange}
                />
                <p style={{color:"red" , fontSize: '1rem'}}>{error.email}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={userChange}
                />
                <p style={{color:"red" , fontSize: '1rem'}}>{error.password}</p>
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="ConfirmPassword"
                  type="password"
                  autoComplete="new-password"
                  onChange={userChange}
                />
                <p style={{color:"red" ,  fontSize: '1rem'}}>{error.confirmpassword}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}

              <Typography variant="body2">Already registered? <Link to="/SignIn">SignIn</Link> </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}