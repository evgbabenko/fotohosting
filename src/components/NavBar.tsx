import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { SanityUser } from '../../typings';
import Search from './Search';

interface Props {
  searchTerm: any;
  setSearchTerm: any;
  user: SanityUser | null;
}

const NavBar = ({ searchTerm, setSearchTerm, user }: Props) => {
  const navigate = useNavigate();

  /* if user not logged in don't show nav panel */
  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex gap-3 justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
          <div className='relative z-0 w-full mb-6 group'>
            <input
              type='search'
              name='search'
              id='search'
              placeholder=' '
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onFocus={() => {
                navigate('/search');
              }}
              required
              className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-greay-500 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer'
            />
            <label
              htmlFor='search'
              className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:translate-y-8'
            >
              <p className='flex flex-row gap-1 text-sm'>
                <IoMdSearch className='h-5 w-5 ml-1 ' /> Search...
              </p>
            </label>
          </div>
        </div>
        {user && (<div className='flex gap-3'>
          <Link to={`/user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt=''
              className='hidden md:flex w-10 aspect-square rounded-full'
            />
          </Link>
          <Link
            to='create-pin'
            className='bg-black w-10 aspect-square text-white flex justify-center items-center rounded-lg hover:bg-sky-800 transition-all duration-200'
          >
            <IoMdAdd />
          </Link>
        </div>)}
      </div>
    </div>
  );
};

export default NavBar;
