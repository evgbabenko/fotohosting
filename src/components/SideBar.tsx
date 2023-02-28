import React, { useState, useEffect } from 'react';
import { Category, SanityUser } from '../../typings';
import { Link, NavLink } from 'react-router-dom';
import { client, urlFor } from '../utils/sanity';
import { categoriesQuery } from '../utils/data';
import { BsFileEarmarkPersonFill, BsHouseDoorFill, BsPersonCircle } from 'react-icons/bs';

interface Props {
  user: SanityUser | null;
  closeToggle?: any;
}

const SideBar = ({ user, closeToggle }: Props) => {
  /* hooks */

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    client.fetch(categoriesQuery()).then((data) => {
      setCategories(data);
    });
  }, []);

  /* funcs */
  const hangleCloseSideBar = () => {
    closeToggle && closeToggle(false);
  };

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex p-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={hangleCloseSideBar}
        >
          <img src='' alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({
              isActive,
            }) => `text-sm xl:text-xl flex items-center px-5 gap-3 transition-all duration-200 ease-in-out capitalize 
            ${
              isActive
                ? 'font-semibold border-r-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
            onClick={hangleCloseSideBar}
          >
            <BsHouseDoorFill className='h-5 w-5' />
            <p className='text-sm'>Home</p>
          </NavLink>
          {!user ? (
            <NavLink
              to='/login'
              className={({
                isActive,
              }) => `text-sm xl:text-xl flex items-center px-5 gap-3 transition-all duration-200 ease-in-out capitalize 
            ${
              isActive
                ? 'font-semibold border-r-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
              onClick={hangleCloseSideBar}
            >
              <BsPersonCircle className='h-5 w-5' />
              <p className='text-sm'>Login</p>
            </NavLink>
          ) : (
            <NavLink
              to={`/user-profile/${user?._id}`}
              className={({
                isActive,
              }) => `text-sm xl:text-xl flex items-center px-5 gap-3 transition-all duration-200 ease-in-out capitalize 
            ${
              isActive
                ? 'font-semibold border-r-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
              onClick={hangleCloseSideBar}
            >
              <BsFileEarmarkPersonFill className='h-5 w-5' />
              <p className='text-sm'>User Profile</p>
            </NavLink>
          )}

          <h3 className='mt-3 px-5 text-sm xl:text-xl'>Discover categories</h3>
          {categories &&
            categories.map((category) => (
              <NavLink
                to={`/category/${category.categoryTitle.toLowerCase()}`}
                key={category._id}
                onClick={hangleCloseSideBar}
                className={({
                  isActive,
                }) => `text-sm xl:text-xl flex items-center px-5 gap-3 transition-all duration-200 ease-in-out capitalize 
            ${
              isActive
                ? 'font-semibold border-r-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
              >
                {category?.catImage ? (
                  <img
                    src={urlFor(category?.catImage).url()}
                    alt=''
                    className='w-10 aspect-square rounded-full object-cover'
                  />
                ) : (
                  <img
                    src='https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns='
                    alt=''
                    className='w-10 aspect-square rounded-full'
                  />
                )}

                <p className='text-sm'> {category.categoryTitle}</p>
              </NavLink>
            ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className='flex my-2 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
        >
          <img
            src={user?.image}
            alt=''
            className='w-10 aspect-square rounded-full'
          />
          <p className='text-sm'>{user.given_name}</p>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
