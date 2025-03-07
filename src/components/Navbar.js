import React from 'react';
import './Navbar.css'
import {
  AppBar,
  Toolbar,
  InputBase,
  Button
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {

    return(
      <AppBar position="static" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Toolbar style={{
          height: 65,
          backgroundColor: 'rgb(255, 0, 0)',
          justifyContent: 'space-between'
        }}>
          <a href="/" style={{
            fontSize: 24,
            textDecorationLine: 'none',
            color: 'white'
          }}><h4>αlpha</h4></a>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'rgba(255,255,255, 0.4)',
            paddingTop: 8,
            paddingBottom: 5,
            paddingLeft: 15,
            paddingRight: 15,
            width: '30vw',
            borderRadius: 4
          }}>
            <div style={{marginTop: 3, marginRight: 10}}>
              <SearchIcon style={{fontSize: 26}}/>
            </div>
            <InputBase
              placeholder="Search…"
              style={{ fontSize: 18, color: 'white', flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div style={{margin: 0, alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
            <Button disableElevation variant="contained" href="/login" style={{color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.4)', textTransform: 'none'}}>Login</Button>
            <Button variant="outlined" href="/signup" style={{marginLeft: 10, textTransform: 'none', color: 'white', borderColor: 'white'}}>Sign up</Button>
          </div>
        </Toolbar>
      </AppBar>
    );
}