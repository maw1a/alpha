import React from 'react';
import{
Paper,
TextField,
Button
}from '@material-ui/core';

export default function Login() {
    return(
        <div style={{
            height: '100vh',
            flex: 1,  
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'rgba(160, 160, 160, 0.2)', 
            // backgroundImage: `url(${a1})`,
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
        <Paper elevation={4}style={{ padding: 20, width: 300, marginBottom: 60}}>
        <h3 style={{marginLeft: 10, color: '#9f9f9f'}}>αlpha</h3>
        <TextField id="standard-basic" label="Phone No." style = {{width:'100%'}}/>
        <TextField id="standard-basic" label="Password" style={{marginTop: 15,width:'100%'}} /> 
        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
         <a href="/SignUp" style={{fontSize: 16, textDecoration: 'none',marginTop:10}}>Don't Have a account? Sign Up! </a>   
        <Button variant="contained" color="secondary" style = {{color: 'white', marginLeft: 'auto',textTransform: 'none',marginTop:10}}>
                    Login
        </Button>
            </div>
        </Paper>
        </div>
    );
}