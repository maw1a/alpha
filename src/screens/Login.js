import React, {useState, useEffect} from 'react';
import{
Paper,
TextField,
Button
}from '@material-ui/core';

export default function Login() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);
    }, []);

    function updateWindowDimensions() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    return(
        <div style={{
            height: height-65,             
            display: 'flex',
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'rgba(160, 160, 160, 0.2)', 
            paddingBottom: 10
        }}>
            <Paper elevation={4}style={{ padding: 20, width: 300}}>
                <h3 style={{marginLeft: 10, color: '#9f9f9f'}}>αlpha</h3>
                <TextField id="standard-basic" label="Phone Number" color='secondary' style = {{width:'100%'}}/>
                <TextField id="standard-basic" type='password' label="Password" color='secondary' style={{marginTop: 15,width:'100%'}} /> 
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                    <p style={{ fontSize: 14 }}>Don't have an account? <a href="/signup" style={{textDecoration: 'none', color: 'rgb(0,0,255)'}}>Sign up</a></p>
                    <Button variant="contained" color="secondary" style = {{color: 'white', marginLeft: 'auto',textTransform: 'none',marginTop:10}}>
                        Login
                    </Button>
                </div>
            </Paper>
        </div>
    );
}