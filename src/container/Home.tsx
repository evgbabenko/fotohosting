import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { UserProfile, SideBar } from '../components';
import { client } from '../utils/sanity';
import Pins from './Pins';
import { SanityUser, User } from '../../typings';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState<SanityUser | null>(null);
  const scrollRef = useRef<any>(null);

  const userInfo: User | any | null = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      userInfo !== undefined || null ? setUser(data[0]) : setUser(null);
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full flex bg-gray-50 flex-col md:flex-row h-screen transition-all duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user={user && user} />
      </div>
      <div className='flex md:hidden flex-wrap w-full shadow-md h-20'>
        <div className='p-2 w-full flex flex-row justify-between items-center'>
          <HiMenu
            className='h-5 w-5 cursor-pointer'
            onClick={() => setToggleSideBar(!toggleSideBar)}
          />
          {/* <Link to='/'>Home</Link> */}
          {user && (
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt={user?.given_name}
                className='rounded-full w-12 aspect-square border border-black p-0.5'
              />
            </Link>
          )}
        </div>
        {toggleSideBar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-lg z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle
                className='h-5 w-5 cursor-pointer'
                onClick={() => setToggleSideBar(!toggleSideBar)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
