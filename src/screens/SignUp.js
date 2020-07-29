import React from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Button,
    IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

import Otp from '../components/Otp';
import codes from '../data/phonecodes.json';

import a1 from '../assets/a1.png';

function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

export default class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0,
            code: codes[26],
            pno: '',
            otpShow: false,
            otp: ''
        };
    }

    getPosition = async(position) => {
        await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
            .then(response => {
                var code = response.data.countryCode;
                const found = codes.find(item => item.name===code);
                this.setState({code: found});
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getPosition);
        }          
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    _getCode = async() => {
        const e = this.state.code.code+this.state.pno;
        await axios.get("http://localhost:8000/verify/getcode", {
            params: {
                phonenumber: e,
                channel: 'sms'
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    };

    _verifyCode = async () => {
        const e = this.state.code.code+this.state.pno;
        await axios.get("http://localhost:8000/verify/verifycode", {
            params: {
                phonenumber: e,
                code: this.state.otp
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render(){
        const height = this.state.height-65;
        return(
            <div style={{
                flex: 1, 
                height: height, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(160, 160, 160, 0.2)', 
                backgroundImage: `url(${a1})`,
                backgroundPosition: 'left',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <Paper elevation={4} style={{ padding: 20, width: 300, marginBottom: 60}}>
                    {!this.state.otpShow ? <h3 style={{marginLeft: 10, color: '#9f9f9f'}}>αlpha</h3> : <IconButton onClick={() => {
                        this.setState({otpShow: false, otp: ''});
                    }} size="small"><ArrowBackIcon /></IconButton>}
                    {!this.state.otpShow ? <h3>Enter your Phone Number</h3> : <h3>Enter the OTP</h3> }
                    {this.state.otpShow ? <p>A One Time Password has been sent to your phone number for verification puposes.</p> : null}
                    <div>
                        {!this.state.otpShow ? <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', justifyContent: 'space-around'}}>
                            <div style={{alignItems: 'flex-end', justifyContent: 'center', display: 'flex', marginRight: 10}}>
                                <TextField id="code" select color="secondary" value={this.state.code} onChange={e => {
                                    this.setState({code: e.target.value});
                                }}>
                                    {codes.map(item => (
                                        <MenuItem key={item.name} value={item}>
                                            <img alt={item.name} src={"https://www.countryflags.io/"+ item.name.toLowerCase() +"/flat/64.png"} style={{alignSelf: 'flex-end', marginRight: 5, height: 20, width: 32, objectFit: 'cover'}}/>
                                            +{item.code}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <TextField id="phone" label="Phone" color="secondary" value={this.state.pno} 
                                onChange={e => {
                                    if((e.target.value[e.target.value.length-1]>='0' && e.target.value[e.target.value.length-1]<='9') || !e.target.value) {
                                        this.setState({pno: e.target.value});
                                    }
                                }}/>
                            </div>
                        </div> : <Otp otp={this.state.otp} setOtp={val => this.setState({otp: val})} />}
                        {this.state.otpShow ? <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
                            Didn't receive an OTP? <Button onClick={() => this._getCode()} color="primary" style={{textTransform: 'none', fontSize: 15}}>Resend OTP</Button>
                        </div> : null }
                        <div style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
                            <Button 
                                variant="contained" 
                                disabled={(this.state.pno.length!==10) || (this.state.code===null) || !isNumeric(this.state.pno) || (this.state.otpShow && this.state.otp.length!==6)} 
                                color="secondary" 
                                style={{ 
                                    color: 'white', 
                                    marginLeft: 'auto', 
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    if(this.state.otpShow) {
                                        this._verifyCode();
                                    } else {
                                        this.setState({otpShow: true});
                                        this._getCode();
                                    }
                                }}>
                                Verify
                            </Button>
                        </div>
                        {!this.state.otpShow ? <p>By tapping Verify an SMS may be sent. Message & data rates may apply.</p> : null}
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
                            <a href='/' style={{textDecoration: 'none', fontSize: 14}}>Terms of service</a>
                            <a href='/' style={{textDecoration: 'none', fontSize: 14, marginLeft: 10}}>User agreement</a>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}