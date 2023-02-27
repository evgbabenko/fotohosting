import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { Pin, SanityUser, User } from '../../typings';
import { urlFor, client } from '../utils/sanity';
import { fetchUser } from '../utils/fetchUser';
import { fetchUserData } from '../utils/data';
import { motion } from 'framer-motion';

interface Props {
  pin: Pin;
  className?: string;
}

const PinCard = ({ pin, className }: Props) => {
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [userData, setUserData] = useState<SanityUser>();

  const user: User = fetchUser();
  const alreadySaved: boolean = !!pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  );

  const savePin = (_id: string) => {
    if (!user) {
      navigate('login');
    }
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(pin?._id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => window.location.reload());
      setSavingPost(false);
    }
  };

  const deletePin = (pinID: string) => {
    client.delete(pinID).then(() => {
      window.location.reload();
    });
  };

  const linkReplece = (e: string) => {
    const r1 = 'http://';
    const r2 = 'https://';
    let e1 = e.replace(r1, '');
    return e1.replace(r2, '');
  };

  useEffect(() => {
    client
      .fetch(fetchUserData(pin?.postedBy?._ref))
      .then((e) => setUserData(e[0]));
  }, [pin]);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }} 

      className={`m-2 relative opacity-0 ${className}`}
    >
      <div
        className={`w-auto relative cursor-zoom-in hover:shadow-lg overflow-hidden rounded-lg transition-all duration-300 ease-in-out`}
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin?._id}`)}
      >
        <img
          src={urlFor(pin.image).width(250).url()}
          alt=''
          className='rounded-lg w-full h-full object-cover'
        />
        {postHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: postHovered ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-3 z-50'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className=' flex gap-2'>
                {user ? (
                  <a
                    href={`${urlFor(pin.image).url()}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdDownloadForOffline className='bg-white text-black h-7 w-7 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-lg hover:outline-none transition-all duration-300' />
                  </a>
                ) : (
                  <Link to='/login' onClick={(e) => e.stopPropagation()}>
                    <MdDownloadForOffline className='bg-white text-black h-7 w-7 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-lg hover:outline-none transition-all duration-300' />
                  </Link>
                )}
              </div>
              {alreadySaved && user ? (
                <button
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white  px-5 py-1 text-sm rounded-xl transition-all duration-300'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin?._id);
                  }}
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white  px-5 py-1 text-sm rounded-xl transition-all duration-300'
                >
                  {savingPost ? 'saving' : 'Save'}
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {pin?.destination && (
                <a
                  href={pin?.destination}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-white rounded-xl p-2 text-sm gap-1 text-black opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-300 flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BsFillArrowUpRightCircleFill className='text-black !h-5 !w-5 ' />
                  <p>{linkReplece(pin?.destination).slice(0, 20)}</p>
                </a>
              )}
              {pin?.postedBy?._ref === user?.sub && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(pin?._id);
                  }}
                  type='button'
                  className='bg-white p-2 opacity-70 hover:opacity-100 text-sm rounded-xl transition-all duration-300'
                >
                  <AiTwotoneDelete className='text-black h-4 w-4' />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
      <Link
        to={`/user-profile/${user?.sub}`}
        className='flex gap-2 mt-2 items-center w-full '
      >
        <img
          src={userData?.image}
          alt=''
          className='w-8 h-8 rounded-full object-cover'
        />
        <p className='font-semibold text-base capitalize'>
          {userData?.given_name}
        </p>
      </Link>
    </motion.div>
  );
};

export default PinCard;
