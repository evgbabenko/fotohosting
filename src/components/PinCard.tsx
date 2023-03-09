import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  BsFillArrowUpRightCircleFill,
  BsFillCloudDownloadFill,
  BsFillTrashFill,
} from 'react-icons/bs';

import { Pin, SanityUser, User } from '../../typings';
import { urlFor, client } from '../utils/sanity';
import { fetchUser } from '../utils/fetchUser';
import { fetchUserData } from '../utils/data';
import { motion } from 'framer-motion';
import { MdFavorite } from 'react-icons/md';

interface Props {
  pin: Pin;
  className?: string;
}

const PinCard = ({ pin, className }: Props) => {
  const navigate = useNavigate();
  const [postHovered, setPostHovered] = useState(false);
  const [likingPost, setLikingPost] = useState(false);
  const [userData, setUserData] = useState<SanityUser>();

  const user: User = fetchUser();
  const alreadySaved: boolean = !!pin?.save?.filter(
    (item) => item?.postedBy?._id === user?.sub
  );

  const likePin = (_id: string) => {
    if (!user) {
      navigate('login');
    }
    if (!alreadySaved) {
      setLikingPost(true);

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
      setLikingPost(false);
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
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`m-2 relative opacity-0 bg-white p-2 rounded-xl ${className}`}
    >
      <div className='card card-compact w-full bg-base-100 shadow-xl'>
        <figure>
          <img src={urlFor(pin.image).url()} alt={pin.title} />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{pin.title}</h2>
    {/*       <p></p> */}
          <div className='card-actions justify-end items-center'>
            {alreadySaved && user ? (
              <button
                type='button'
                className='bg-red-500 opacity-70 hover:opacity-100 text-white  px-5 py-1 text-sm rounded-xl transition-all duration-300 flex flex-row gap-2'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {pin?.save?.length}{' '}
                <MdFavorite className='h-5 w-5 text-white' />
                Like
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  likePin(pin?._id);
                }}
                type='button'
                className='bg-red-500 opacity-70 hover:opacity-100 text-white  px-5 py-1 text-sm rounded-xl transition-all duration-300'
              >
                {likingPost ? 'liking' : 'Like'}
              </button>
            )}
            {user ? (
              <a
                href={`${urlFor(pin?.image).url()}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-xl p-2 text-sm gap-1 text-black opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-300 flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap'
              >
                <BsFillCloudDownloadFill className='text-black !h-5 !w-5 ' />
              </a>
            ) : (
              <Link
                to='/login'
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-xl p-2 text-sm gap-1 text-black opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-300 flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap'
              >
                <BsFillCloudDownloadFill className='bg-white text-black h-7 w-7 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-lg hover:outline-none transition-all duration-300' />
              </Link>
            )}
          </div>
          {/* <div className='card-actions justify-end'>
            <div className='badge badge-outline'>
              <a
                href={pin?.destination ? pin?.destination : '#'}
                target='_blank'
                rel='noreferrer'
                className='text-sm gap-1 text-black flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <BsFillArrowUpRightCircleFill className='text-black !h-5 !w-5 ' />
                <p>
                  {pin?.destination
                    ? linkReplece(pin?.destination).slice(0, 20)
                    : ''}
                </p>
              </a>
            </div>
           
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default PinCard;
