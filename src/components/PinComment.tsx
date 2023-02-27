import React, { useState, useEffect } from 'react';

import { Comment, SanityUser } from '../../typings';
import { fetchUserData } from '../utils/data';
import { client } from '../utils/sanity';
import { Link } from 'react-router-dom';

interface Props {
  _ref: string;
  comment: Comment;
}

const PinComment = ({ _ref, comment }: Props) => {
  const [userData, setUserData] = useState<SanityUser | null>(null);

  useEffect(() => {
    _ref && client.fetch(fetchUserData(_ref)).then((e) => setUserData(e[0]));
  }, [_ref]);

  console.log(userData);

  if (!userData) return null;
  return (
    <div className='flex gap-2 mt-5 items-start bg-white rounded-lg justify-start w-full flex-row'>
      
        <Link
          to={`/user-profile/${userData?._id}`}
          className='bg-white rounded-xl p-2 text-sm gap-1 text-black hover:shadow-md transition-all duration-300 flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap min-w-[100px]'
        >
          <img
            src={userData?.image}
            alt=''
            className='w-8 h-8 rounded-full object-cover'
          />
          <p className='font-semibold text-sm capitalize text-black'>
            {userData?.given_name}
          </p>
        </Link>
     
      <div className='text-sm py-1 text-black'>{comment.comment}</div>
    </div>
  );
};

export default PinComment;
