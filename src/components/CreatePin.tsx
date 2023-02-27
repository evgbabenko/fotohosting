import React, { useState, useEffect } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { client } from '../utils/sanity';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid';
import { Category,  SanityUser, newPinCat } from '../../typings';
import { categoriesQuery } from '../utils/data';

interface Props {
  user: SanityUser | null;
}

const CreatePin = ({ user }: Props) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [postCategories, setPostCategories] = useState <newPinCat[]>([])
  const [title, setTitle] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<boolean>(false);
  const [category, setCategory] = useState<string | null>(null);
  const [imageAsset, setImageAsset] = useState<any | null>(null);
  const [wrongImageType, setWrongImageType] = useState<boolean | null>(null);

  useEffect(() => {
    client.fetch(categoriesQuery()).then((data) => {
      setCategories(data);
    });
  }, []);

  const uploadImage = (e: any) => {
    const { type, name } = e.target.files[0];
    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/gif' ||
      type === 'image/tiff'
    ) {
      setWrongImageType(false);
      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          console.log(imageAsset);
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
    if (title && about && destination && imageAsset?._id && postCategories) {
      const newPin = {
        _type: 'pin',
        title: title,
        about: about,
        destination: destination,
        image: {
          _type: 'image',
          asset:{
            _ref: imageAsset?._id,
            _type: 'image',
          }
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
      
  } 

  if (!user) {
    navigate('/login', { replace: true });
  }
  return (
    <div className='w-full flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-secondaryColor p-3 flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border border-dotted border-gray-300 p-3 w-full h-420'>
            {loading && <Spinner message='Uploading...' />}
            {wrongImageType && (
              <p className='font-semibold text-red-500 text-lg'>
                wrong image type...
              </p>
            )}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-semibold text-2xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    use HQ JPG, PNG, SVG, GIF or TIFF less than 20md
                  </p>
                </div>
                <input
                  type='file'
                  name='upload-file'
                  onChange={uploadImage}
                  className='w-0 h-0'
                  /* accept='image/png, image/svg ,image/jpeg, image/gif, image/tiff' */
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
                required
                value={destination}
                onChange={(destination) => setDestination(destination.target.value)}
                className='block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-300 peer'
              />
              <label
                htmlFor='destination'
                className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-300 peer-focus:dark:text-v peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Destination
              </label>
            </div>
          </div>

          {/* category */}

          <div className='flex flex-col'>
            <div className=''>
              <p className='mb-2 font-semibold text-lg'>Choose category</p>
            </div>

            <div className='flex flex-row gap-5 flex-wrap w-3/4'>
              {categories?.map((category) => (
                <div className='mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]'>
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
                    className='relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[""] checked:border-sky-500 checked:bg-sky-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[""] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[""] checked:focus:border-sky-500 checked:focus:bg-sky-500 checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent'
                  />
                  <label
                    htmlFor={category._id}
                    className='inline-block pl-[0.15rem] hover:cursor-pointer'
                  >
                    {category.categoryTitle}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-end items-end mt-5'>
            <button
              type='button'
                 onClick={()=>savePin()} 
              className='bg-gray-500 hover:bg-sky-500 transition-all duration-500 px-3 py-2 rounded-xl text-white font-semibold hover:text-black'
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
