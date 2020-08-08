import React from 'react';
import {
    Paper,
    TextField,
    MenuItem,
    Button,
    IconButton,
    LinearProgress,
    Avatar
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Otp from '../components/Otp';
import codes from '../data/phonecodes.json';

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
            otp: '',
            loading: false,
            err: '',
            profile: false,
            dp: null,
            dpurl: null,
            name: '',
            password: ''
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
        this.setState({loading: true});
        const e = this.state.code.code+this.state.pno;
        await axios.get("http://localhost:8000/verify/getcode", {
            params: {
                phonenumber: e,
                channel: 'sms'
            }
        })
        .then(data => {
            if(data.valid) {
                this.setState({err: 'This number is already registered'});
            } else {
                this.setState({err: '', otpShow: true});
            }
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({loading: false}));
    };

    _verifyCode = async () => {
        this.setState({loading: true});
        const e = this.state.code.code+this.state.pno;
        await axios.get("http://localhost:8000/verify/verifycode", {
            params: {
                phonenumber: e,
                code: this.state.otp
            }   
        })
        .then(data => {
            if(data.valid) {
                this.setState({err: 'Invalid OTP'});
            } else {
                this.setState({err: '', profile: true});
            }
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({loading: false}));
    }

    _registerAccount = async() => {
        this.setState({loading: true});
        axios.post("http://localhost:8000/user/signup", {
            name: this.state.name,
            phone: this.state.code.code+this.state.pno,
            password: this.state.password
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .finally(() => {
            this.setState({loading: false});
            return(<Redirect to='/' />);
        });
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
                backgroundColor: 'rgba(160, 160, 160, 0.2)'
            }}>
                <div>
                    {this.state.loading ? <LinearProgress color="secondary"/> : null}
                    {!this.state.profile ? <Paper elevation={8} square style={{ padding: 20, width: 300, marginBottom: 60, opacity: this.state.loading ? 0.6 : 1}}>
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
                                                <img alt={item.name} src={"https://www.countryflags.io/"+ item.name.toLowerCase() +"/flat/64.png"} style={{alignSelf: 'flex-end', marginRight: 5, height: 18, width: 32, objectFit: 'cover'}}/>
                                                +{item.code}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div>
                                    <TextField id="phone" label={<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 18}}><PhoneOutlinedIcon fontSize='small' style={{marginRight: 5}}/>Phone</div>} color="secondary" helperText={this.state.err} value={this.state.pno} 
                                    onChange={e => {
                                        if((e.target.value[e.target.value.length-1]>='0' && e.target.value[e.target.value.length-1]<='9') || !e.target.value) {
                                            this.setState({pno: e.target.value});
                                        }
                                    }}/>
                                </div>
                            </div> : <Otp helper={this.state.err} otp={this.state.otp} setOtp={val => this.setState({otp: val})} />}
                            {this.state.otpShow ? <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5}}>
                                Didn't receive an OTP? <Button onClick={() => this._getCode()} color="primary" style={{textTransform: 'none', fontSize: 15}}>Resend OTP</Button>
                            </div> : <p style={{ fontSize: 14 }}>Already have an account? <a href="/login" style={{textDecoration: 'none', color: 'rgb(0,0,255)'}}>Log in.</a></p> }
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
                    </Paper> : <Paper elevation={8} square style={{ padding: 20, width: 300, marginBottom: 60, opacity: this.state.loading ? 0.6 : 1}}>
                        <p style={{marginLeft: 10, color: '#9f9f9f', fontSize: 20, fontWeight: 'bold'}}>Your Profile</p>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <input type="file" accept="image/*" id="file" style={{display: 'none'}} onChange ={(event) => {
                                event.preventDefault();
                                let reader = new FileReader();
                                let file = event.target.files[0] || this.state.dp;
                                reader.onloadend = () => {
                                    this.setState({dp: file, dpurl: reader.result});
                                }
                                reader.readAsDataURL(file);
                            }}/>
                            <label htmlFor="file">
                                <Avatar src={this.state.dpurl} style={{height: 100, width: 100}}/>
                            </label>
                            <p style={{fontSize: 20, backgroundColor: 'rgba(100, 100, 100, 0.2)', padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 5}}>+{this.state.code.code}-{this.state.pno}</p>
                            <TextField color="secondary" value={this.state.name} variant='outlined' style={{width: '94%', textAlign: 'center'}} label="Name" onChange={event => this.setState({name: event.target.value})}/>
                            <TextField color="secondary" value={this.state.password} variant='outlined' type="password" style={{width: '94%', textAlign: 'center', marginTop: 20}} label="Password" onChange={event => this.setState({password: event.target.value})}/>
                            <Button 
                            variant='contained' 
                            color='secondary' 
                            style={{
                                marginTop: 15, 
                                textTransform: 'none', 
                                fontSize: 18, 
                                paddingLeft: 15, 
                                paddingRight: 15
                            }} 
                            endIcon={<ArrowForwardIcon/>}
                            disabled={this.state.password.length<8 || this.state.name === ''}
                            onClick={() => this._registerAccount()}>
                                Save
                            </Button>
                        </div>
                    </Paper>}
                </div>
            </div>
        );
    }
}