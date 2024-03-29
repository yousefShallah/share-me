import React from 'react';
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc' 
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (res) => {
        console.log("res", res);
        localStorage.setItem("user", JSON.stringify(res.profileObj))
        const { name, googleId, iamgeUrl } = res.profileObj;
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: iamgeUrl
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true })
        }) 
    }
    
    return (
        <div className='flex justify-start item-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video 
                src={shareVideo} 
                type="video/mp4"
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'
                />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img 
                    src={logo}
                    width="130px"
                    alt="logo"
                    />
                </div>
                <div className='shadow-2x1'>
                    <GoogleLogin 
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                        <button
                        type="button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none '
                        > <FcGoogle className='mr-4' /> SignIn with Google </button>
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy='single_host_origin'
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
