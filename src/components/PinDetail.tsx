import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client, urlFor } from '../utils/sanity';
import { Pin, SanityUser } from '../../typings';
import {
  fetchCommentImage,
  fetchUserData,
  pinDetailQuery,
} from '../utils/data';
import {
  BsFillArrowUpRightCircleFill,
  BsFillCloudDownloadFill,
} from 'react-icons/bs';
import PinComment from './PinComment';

interface Props {
  user: SanityUser | null;
}

const PinDetail = ({ user }: Props) => {
  const [pins, setPins] = useState<Pin[] | null>(null);
  const [pinDetail, setPinDetail] = useState<Pin | null>(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState('');
  const [userData, setUserData] = useState<SanityUser>();
  const [userImg, setUserImg] = useState<string[]>([]);
  const { pinId } = useParams();

  const fetchPinDetails = (pinId: string) => {
    let query = pinDetailQuery(pinId);
    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        /*                 if (data[0]) {
                  query = pinDetailMoreQuery(data[0]);
                
                  client.fetch(query).then((res) => 
                    setPins(res))
                } */
      });
    }
  };

  useEffect(() => {
    pinId && fetchPinDetails(pinId);
  }, [pinId]);

  useEffect(() => {
    pinDetail &&
      client
        .fetch(fetchUserData(pinDetail?.postedBy?._ref))
        .then((e) => setUserData(e[0]));
  }, [pinDetail]);

  const linkReplece = (e: string) => {
    const r1 = 'http://';
    const r2 = 'https://';
    let e1 = e.replace(r1, '');
    return e1.replace(r2, '');
  };

  if (!pinDetail) return <Spinner message='Loading info...' />;
  return (
    <div
      className='flex flex-col xl:flex-row mx-auto bg-white px-5 py-5 gap-5'
      style={{ maxWidth: '1500px', borderRadius: '32px' }}
    >
      <div className='flex justify-center items-center md:items-start flex-initial'>
        <img
          src={pinDetail?.image && urlFor(pinDetail?.image).url()}
          alt=''
          className='rounded-t-xl rounded-b-md shadow-lg'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            {user ? (
              <a
                href={`${urlFor(pinDetail?.image).url()}?dl=`}
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
          {pinDetail?.destination && (
            <a
              href={pinDetail?.destination}
              target='_blank'
              rel='noreferrer'
              className='bg-white rounded-xl p-2 text-sm gap-1 text-black opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-300 flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <BsFillArrowUpRightCircleFill className='text-black !h-5 !w-5 ' />
              <p>{linkReplece(pinDetail?.destination).slice(0, 20)}</p>
            </a>
          )}
        </div>
        <div className=' flex flex-row justify-between items-start mt-3'>
          <div className='mt-3'>
            <h1 className='text-3xl font-semibold break-words capitalize'>
              {pinDetail?.title}
            </h1>
            <p className='mt-3'>{pinDetail?.about}</p>
          </div>

          <div className=''>
            <Link
              to={`/user-profile/${pinDetail.postedBy._ref}`}
              className='bg-white rounded-xl p-2 text-sm gap-1 text-black hover:shadow-md transition-all duration-300 flex justify-start items-center flex-shrink-0 overflow-hidden whitespace-nowrap'
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
          </div>
        </div>

        <h2 className='mt-5 text-xl font-semibold'>Comments</h2>
        <div className='max-h-370 overflow-y-hidden'>
          {pinDetail.comments &&
            pinDetail.comments.map((comment, index) => (
              comment && <PinComment _ref={comment.postedBy._ref} comment={comment} key={`${comment._id}-${index}`}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
