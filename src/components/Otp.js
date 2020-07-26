import React, {useState, createRef} from 'react';

export default function Otp() {
    const [otp, setOtp] = useState('');
    const ref0 = createRef();
    const ref1 = createRef();
    const ref2 = createRef();
    const ref3 = createRef();
    const ref4 = createRef();
    const ref5 = createRef();
    return(
        <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'row', padding: 10, borderRadius: 5}}>
            <div style={{ backgroundColor: 'white', height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#cecece', borderStyle: 'solid', marginRight: 5 }}>
                <input 
                placeholder="•"
                ref={ref0}
                value={otp.slice(0,1)}
                style={{fontSize: 24, width: 20, borderWidth: 0, borderColor: 'white', display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}} 
                onChange={(event) => {
                    if(event.target.value !== '' && event.target.value.length===1) {
                        setOtp(otp + event.target.value);
                        ref1.current.focus();
                    } else {
                        if(event.target.value.length>1) {
                            setOtp(event.target.value.slice(1,2) + otp.slice(1));
                            ref1.current.focus();
                        } else {
                            setOtp(otp.slice(1));
                        }
                    }
                }}
                />
            </div>

            <div style={{ backgroundColor: 'white', height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#cecece', borderStyle: 'solid', marginRight: 5 }}>
                <input 
                placeholder="•"
                ref={ref1}
                value={otp.slice(1,2)}
                style={{fontSize: 24, width: 20, borderWidth: 0, borderColor: 'white', display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}} 
                onChange={(event) => {
                    if(event.target.value !== '' && event.target.value.length===1) {
                        setOtp(otp + event.target.value);
                        ref2.current.focus();
                    } else {
                        if(event.target.value.length>1) {
                            setOtp(otp.slice(0, 1) + event.target.value.slice(1,2) + otp.slice(2));
                            ref2.current.focus();
                        } else {
                            setOtp(otp.slice(0, 1)+ otp.slice(2));
                            ref0.current.focus();
                        }
                    }
                }}
                />
            </div>

            <div style={{ backgroundColor: 'white', height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#cecece', borderStyle: 'solid', marginRight: 5 }}>
                <input 
                placeholder="•"
                ref={ref2}
                value={otp.slice(2,3)}
                style={{fontSize: 24, width: 20, borderWidth: 0, borderColor: 'white', display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}} 
                onChange={(event) => {
                    if(event.target.value !== '' && event.target.value.length===1) {
                        setOtp(otp + event.target.value);
                        ref3.current.focus();
                    } else {
                        if(event.target.value.length>1) {
                            setOtp(otp.slice(0, 2) + event.target.value.slice(1,2) + otp.slice(3));
                            ref3.current.focus();
                        } else {
                            setOtp(otp.slice(0, 2)+ otp.slice(3));
                            ref1.current.focus();
                        }
                        
                    }
                }}
                />
            </div>

            <div style={{ backgroundColor: 'white', height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#cecece', borderStyle: 'solid', marginRight: 5 }}>
                <input 
                placeholder="•"
                ref={ref3}
                value={otp.slice(3,4)}
                style={{fontSize: 24, width: 20, borderWidth: 0, borderColor: 'white', display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}} 
                onChange={(event) => {
                    if(event.target.value !== '' && event.target.value.length===1) {
                        setOtp(otp + event.target.value);
                        ref4.current.focus();
                    } else {
                        if(event.target.value.length>1) {
                            setOtp(otp.slice(0, 3) + event.target.value.slice(1,2) + otp.slice(4));
                            ref4.current.focus();
                        } else {
                            setOtp(otp.slice(0, 3)+ otp.slice(4));
                            ref2.current.focus();
                        }
                    }
                }}
                />
            </div>

            <div style={{ backgroundColor: 'white', height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#cecece', borderStyle: 'solid', marginRight: 5 }}>
                <input 
                placeholder="•"
                ref={ref4}
                value={otp.slice(4,5)}
                style={{fontSize: 24, width: 20, borderWidth: 0, borderColor: 'white', display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}} 
                onChange={(event) => {
                    if(event.target.value !== '' && event.target.value.length===1) {
                        setOtp(otp + event.target.value);
                        ref5.current.focus();
                    } else {
                        if(event.target.value.length>1) {
                            setOtp(otp.slice(0, 4) + event.target.value.slice(1,2) + otp.slice(5));
                            ref5.current.focus();
                        } else {
                            setOtp(otp.slice(0, 4)+ otp.slice(5));
                            ref3.current.focus();
                        }
                    }
                }}
                />
            </div>

            <div style={{ backgroundColor: 'white', height: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#cecece', borderStyle: 'solid' }}>
                <input 
                placeholder="•"
                ref={ref5}
                value={otp.slice(5)}
                style={{fontSize: 24, width: 20, borderWidth: 0, borderColor: 'white', display: 'flex', alignItems: 'center', justifySelf: 'center', textAlign: 'center'}} 
                onChange={(event) => {
                    if(event.target.value !== '' && event.target.value.length===1) {
                        setOtp(otp + event.target.value);
                        ref5.current.blur();
                    } else {
                        if(event.target.value.length>1) {
                            setOtp(otp.slice(0, 5) + event.target.value.slice(1,2));
                            ref5.current.blur();
                        } else {
                            setOtp(otp.slice(0, 5));
                            ref4.current.focus();
                        }
                    }
                }}
                />
            </div>

        </div>
    );
}