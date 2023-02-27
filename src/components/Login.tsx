import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { SanityUser, User } from '../../typings';
import { client } from '../utils/sanity';

const Login = () => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      localStorage.setItem('user', JSON.stringify(userInfo.data as User));
      const {
        email, family_name,
        given_name,
        locale,
        picture,
        sub,
      } = userInfo.data;

      const newUser: SanityUser = {
        _id: sub,
        _type: 'user',
        email: email,
        family_name: family_name,
        given_name: given_name,
        image: picture,
      }

      client.createIfNotExists(newUser).then(() => {
        navigate('/', {replace: true})
      })
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className='w-full h-screen flex flex-col justify-start items-center'>
      <div className='relative w-full h-full'>
        <video
          src='../assets/login.mp4'
          typeof='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
      </div>
      <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-black/50'>
        <div className='p-5'>
          <img src='' alt='logo' width='130px' />
        </div>
        <div className='shadow-2xl'>
          <button
            type='submit'
            className='flex flex-row gap-3 flex-nowrap justify-center items-center border rounded-xl px-3 py-2 bg-white/60 hover:bg-white transition-all duration-200'
            onClick={() => login()}
          >
            <FcGoogle className='h-5 w-5' /> Google login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
