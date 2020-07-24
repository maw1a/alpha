import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  Typography
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
    return(
      <AppBar position="static">
        <Toolbar style={{
          height: 60,
          backgroundColor: 'rgb(255, 0, 0)',
          justifyContent: 'space-between'
        }}>
          <a href="/" style={{
            fontSize: 24,
            textDecorationLine: 'none',
            color: 'white'
          }}>αlpha</a>
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