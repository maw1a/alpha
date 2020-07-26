import React from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Button
} from '@material-ui/core';

import Otp from '../components/Otp';
import codes from '../data/phonecodes.json';

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
            code: null,
            pno: '',
            otp: false
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render(){
        const height = this.state.height-65;
        return(
            <div style={{flex: 1, height: height, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eeeeee'}}>   
                <Paper elevation={2} style={{ padding: 20, width: 300, marginBottom: 60}}>
                    <h3>Enter your Phone Number</h3>
                    <div>
                        {/* Not operator(!) for production test */}
                        {this.state.otp ? <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around'}}>
                            <div style={{alignItems: 'flex-end', justifyContent: 'center', display: 'flex', marginRight: 10}}>
                                <TextField id="code" select color="secondary" value={this.state.code} onChange={e => {
                                    this.setState({code: e.target.value});
                                }}>
                                    {codes.map(item => (
                                        <MenuItem key={item.name} value={item}>
                                            <img alt={item.name} src={"https://www.countryflags.io/"+ item.name.toLowerCase() +"/flat/64.png"} style={{alignSelf: 'flex-end', marginRight: 5, height: 20, width: 32, objectFit: 'cover'}}/>
                                            {item.code}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <TextField id="phone" label="Phone" color="secondary" value={this.state.pno} 
                                onChange={e => {
                                    this.setState({pno: e.target.value});
                                }}/>
                            </div>
                        </div> : <Otp />}
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                            <Button 
                                variant="contained" 
                                disabled={(this.state.pno.length!==10) || (this.state.code===null)} 
                                color="secondary" 
                                style={{ 
                                    color: 'white', 
                                    marginLeft: 'auto', 
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    this.setState({otp: true});
                                }}>
                                Verify
                            </Button>
                        </div>
                        <p>By tapping Verify an SMS may be sent. Message & data rates may apply.</p>
                    </div>
                </Paper>
            </div>
        );
    }
}