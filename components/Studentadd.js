import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



const theme = createTheme();

export default function Studentadd({onClose ,currentdata , studata}) {
    const [adddata , setAdddata]=useState({firstName: currentdata.firstName, lastName:currentdata.lastName, email:currentdata.email,score:currentdata.score});
    const [errors , setErrors]=useState({firstName: "", lastName:"",email:"",score:""})
  
    const inputChange=(event)=>{
         console.log(event.target.value);
          const {name , value}= event.target
          setAdddata({...adddata,[name]:value})
        }
    const handleSubmit = (event) => {
    event.preventDefault();
        
    const formError= {};

    const emailptrn=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const namePttrn=/^[a-zA-Z0-9]{2,20}$/;
    const scorepattern=/^[0-9]{0,100}$/;

    let str=adddata.email.match(emailptrn);
  let str2=adddata.firstName.match(namePttrn);   
  let str3=adddata.lastName.match(namePttrn); 
  let str4= adddata.score.match(scorepattern)
  if(!str){
    formError.email="email is not valid"
   }
   if(!str2){
     formError.firstName="First name is require";
   }
   if(!str3){
     formError.lastName="Last name is require";
   }
   

    else if(str && str2 && str3)
    {
        console.log("Values",adddata);
        const innputdata= adddata;
        axios.post('http://localhost:8000/datastudent',innputdata);
        onClose();
        Swal.fire({
            icon:"Success",
            title:"Success",
            text:"Successfull Added"
          }).then(function() {
            window.location = "/Grids"})
    }
    setErrors(formError)
  };
console.log("Dataassss",currentdata);
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
          Add student
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange={inputChange}
                  label="First Name"
                  autoFocus
                  defaultValue={currentdata.firstName}
                />
                <p style={{color:"red"}}>{errors.firstName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={inputChange}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={currentdata.lastName}
                />
                <p style={{color:"red"}}>{errors.lastName}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={inputChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={currentdata.email}
                />
                <p style={{color:"red"}}>{errors.email}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required='true'
                  fullWidth
                  name="score"
                  label="Score"
                  type="number"
                  onChange={inputChange}
                  autoComplete="new-password"
                  defaultValue={currentdata.score}
                />
                <p style={{color:"red"}}>{errors.score}</p>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}