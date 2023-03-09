import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { client } from '../utils/sanity';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid';
import { Category, SanityUser, newPinCat } from '../../typings';
import { categoriesQuery } from '../utils/data';
import isUrl from 'is-url';



interface Props {
  user: SanityUser | null;
}

const CreatePin = ({ user }: Props) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [postCategories, setPostCategories] = useState<newPinCat[]>([]);
  const [title, setTitle] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<boolean>(false);
  const [category, setCategory] = useState<string | null>(null);
  const [imageAsset, setImageAsset] = useState<any | null>(null);
  const [wrongImageType, setWrongImageType] = useState<boolean | null>(null);
  const [wrongDestination, setWrongDestination] = useState(false);

  useEffect(() => {
    client.fetch(categoriesQuery()).then((data) => {
      setCategories(data);
    });
  }, []);

  const uploadImage = (e: any) => {
    setLoading(true);
    const { type, name } = e.target.files[0];
    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff' ||
      type === 'image/webp'
    ) {
      setWrongImageType(false);
      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && imageAsset?._id && postCategories) {
      const newPin = {
        _type: 'pin',
        title: title,
        about: about,
        destination: isUrl(destination)
          ? destination
          : process.env.REACT_APP_BASE_URL,
        image: {
          _type: 'image',
          asset: {
            _ref: imageAsset?._id,
            _type: 'image',
          },
        },
        userId: user?._id,
        postedBy: {
          _ref: user?._id as string,
          _type: 'postedBy',
        },
        category: postCategories,
      };
      client.create(newPin).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);
    }
  };

  if (!user) {
    navigate('/login', { replace: true });
  }
  return (
    <div className='w-full flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border border-dotted border-gray-300 p-3 w-full h-420 hover:bg-white transition-all duration-200'>
            {loading && <Spinner message='Uploading...' />}
            {wrongImageType && (
              <p className='font-semibold text-red-500 text-lg'>
                wrong image type...
              </p>
            )}
            {!imageAsset ? (
              <label className=''>
                <div className='flex flex-col items-center justify-center h-full '>
                  <div className='flex flex-col justify-center items-center '>
                    <p className='font-semibold text-2xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    use HQ JPG, PNG, SVG, GIF, WEBP or TIFF less than 20md
                  </p>
                </div>
                <input
                  type='file'
                  name='upload-file'
                  onChange={uploadImage}
                  className='w-0 h-0'
                  accept='image/png, image/svg ,image/jpeg, image/gif, image/tiff, image/webp'
                />
              </label>
            ) : (
              <div className='relative h-full'>
                <img
                  src={imageAsset?.url}
                  alt='uploadedimage'
                  className='w-full h-full object-cover'
                />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* form */}
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          {/* user */}
          {user && (
            <div className='flex gap-2 my-2 items-center bg-white border-lg '>
              <img src={user?.image} alt='userimage' className='rounded-full' />
              <p>
                {user?.given_name} {user?.family_name}
              </p>
            </div>
          )}
          {/* title */}
          <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='title'
                id='title'
                placeholder=' '
                required
                value={title}
                onChange={(title) => setTitle(title.target.value)}
                className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer'
              />
              <label
                htmlFor='title'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Title
              </label>
            </div>
          </div>
          {/* about */}
          <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
            <div className='relative z-0 w-full mb-6 group'>
              <textarea
                rows={2}
                name='about'
                id='about'
                placeholder=' '
                required
                value={about}
                onChange={(about) => setAbout(about.target.value)}
                className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer resize-none'
              />
              <label
                htmlFor='about'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                About
              </label>
            </div>
          </div>

          {/* destination */}
          <div className='w-full flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 md:items-center'>
            <div className='relative z-0 w-full mb-6 group'>
              <input
                type='text'
                name='destination'
                id='destination'
                placeholder=' '
                value={destination}
                onChange={(destination) =>
                  setDestination(destination.target.value)
                }
                className={`block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer ${
                  wrongDestination
                    ? 'text-red-700 border-red-700'
                    : 'border-gray-300 text-black'
                }`}
              />
              <label
                htmlFor='destination'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Destination (use URL statment 'http://*.*') or leave empty
              </label>
            </div>
          </div>

          {/* category */}

          <div className='flex flex-col'>
            <div className=''>
              <p className='mb-2 font-semibold text-lg'>Choose category</p>
            </div>

            <div className='flex flex-row gap-5 flex-wrap w-3/4 form-control'>
              {categories?.map((category) => (
                <div className=''>
                  <label className='label cursor-pointer flex items-center gap-x-2'>
                    <input
                      type='checkbox'
                      id={category._id}
                      name='category'
                      value={category._id}
                      key={category._id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPostCategories([
                            ...postCategories,
                            {
                              _type: 'reference',
                              _ref: category._id,
                              _key: uuidv4(),
                            },
                          ]);
                        } else {
                          setPostCategories(
                            postCategories.filter(
                              (item) => item._ref !== e.target.value
                            )
                          );
                        }
                      }}
                      className='checkbox checkbox-info checkbox-sm'
                    />
                    <span className='label-text'>{category.categoryTitle}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end items-end mt-5'>
            <button
              type='button'
              onClick={() => savePin()}
              className='btn btn-outline btn-info'
            >
              Save
            </button>
            
          </div>
          {/* description end */}
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
