import React, { useState } from 'react';
import { SanityUser } from '../../typings';
import { Routes, Route } from 'react-router-dom';
import { NavBar, Feed, PinDetail, CreatePin, Search } from '../components';

interface Props {
  user: SanityUser | null;
}

const Pins = ({ user }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route
            path='/pin-detail/:pinId'
            element={<PinDetail user={user} />}
          />
          <Route path='/create-pin' element={<CreatePin user={user} />} />
          <Route path='/search' element={<Search searchTerm={searchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
