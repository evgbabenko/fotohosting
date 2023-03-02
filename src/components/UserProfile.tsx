import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: string;
}

const UserProfile = ({ userId }: Props) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    googleLogout();
    navigate('/', { replace: false });
    navigate(0);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='mt-5 flex flex-col w-full items-center'>
        <div className='bg-white p-5 w-full flex flex-col max-w-md md:max-w-4xl'>
          {/* userName */}
          <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='username'
                id='username'
                placeholder=' '
                required
                /* value={title}
                onChange={(title) => setTitle(title.target.value)} */
                className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer'
              />
              <label
                htmlFor='username'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                User name
              </label>
            </div>
          </div>
          {/* end username */}
          {/* userName */}
          <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='secondname'
                id='secondname'
                placeholder=' '
                required
                /* value={title}
                onChange={(title) => setTitle(title.target.value)} */
                className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer'
              />
              <label
                htmlFor='secondname'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Second name
              </label>
            </div>
          </div>
          {/* end username */}
          {/* userName */}
          <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder=' '
                required
                readOnly
                value='help@help.com'
                /* onChange={(title) => setTitle(title.target.value)} */
                className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer'
              />
              <label
                htmlFor='email'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Email
              </label>
            </div>
          </div>
          {/* end username */}
          <div className='w-full flex flex-row justify-around'>
            <button>Save</button>
            <button type='button' onClick={() => handleLogOut()} className='rounded-xl px-2 py-2 bg-sky-300 text-sm font-semibold'>
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
