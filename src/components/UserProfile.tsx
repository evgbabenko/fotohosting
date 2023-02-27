import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    googleLogout();
    navigate('/', { replace: false });
    navigate(0);
  };

  return (
    <div>
      UserProfile
      <div onClick={() => handleLogOut()}>logout</div>
    </div>
  );
};

export default UserProfile;
