import React, { useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineLogout, MdOutlineSave } from 'react-icons/md';
import MasonryLayout from './MasonryLayout';

import { client, urlFor } from '../utils/sanity';
import { fetchUserData, userPinsHistory, userSavedHistory } from '../utils/data';
import { Pin, SanityUser, User } from '../../typings';
import Spinner from './Spinner';

const activeBtnStyles =
  'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const navigate = useNavigate();
  const { uId } = useParams();
  const [userHistory, setUserHistory] = useState<Pin[]>([]);
  const [userData, setUserData] = useState<SanityUser | null>(null);
  const [activeSaveBtn, seaActiveSaveBtn] = useState(false);
  const [activeBtn, setActiveBtn] = useState('created');

  useEffect(() => {
    uId &&
      client.fetch(fetchUserData(uId)).then((data) => {
        setUserData(data[0]);
      });
  }, [uId]);

  useEffect(() => {
    if (activeBtn === 'created') {
      uId && client.fetch(userPinsHistory(uId)).then((data) => {
        setUserHistory(data);
      });
    } else if (activeBtn === 'liked') {
      uId &&
        client.fetch(userSavedHistory(uId)).then((data) => {
          setUserHistory(data);
        });
    }
  }, [activeBtn, uId]);

  const randomData = () => {
    const rand = Math.floor(Math.random() * userHistory.length);
    return userHistory[rand];
  };

  const handleLogout = () => {
    localStorage.clear();
    googleLogout();
    window.location.href = '/';
  };

  if (userHistory.length === 0)
    return <Spinner message='Loading profile info...' />;
  return (
    <div className='w-full h-full flex flex-col items-center p-5'>
      <div className='flex flex-col pb-5'>
        <div className='mb-7 flex flex-col relative items-center'>
          <div className='flex flex-col justify-center'>
            <img
              src={urlFor(randomData().image).url()}
              alt=''
              className='w-full h-370 2xl:h-510 rounded-xl shadow-xl'
            />
            <MdOutlineLogout
              className='bg-white rounded-full h-10 w-10 p-2 absolute top-5 right-5 cursor-pointer'
              title='Logout'
              onClick={() => handleLogout()}
            />
          </div>
          <img
            src={userData?.image}
            alt=''
            className='relative w-16 h-16 object-cover rounded-full bottom-8 z-10 shadow-xl'
          />

          <h1 className='text-2xl font-semibold italic'>
            {userData?.given_name} {userData?.family_name}
          </h1>
        </div>
      </div>
      <div className='flex justify-between max-w-[200px] w-full'>
        <button
          type='button'
          onClick={() => {
            setActiveBtn('created');
          }}
          className={`${
            activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
          }`}
        >
          Created
        </button>
        <button
          type='button'
          onClick={() => {
            setActiveBtn('liked');
          }}
          className={`${
            activeBtn === 'liked' ? activeBtnStyles : notActiveBtnStyles
          }`}
        >
          Liked
        </button>
      </div>
      <div className='mt-5 flex flex-col w-full items-center px-5'>
        {userHistory && <MasonryLayout pins={userHistory} />}
      </div>
    </div>
  );
};

export default UserProfile;
