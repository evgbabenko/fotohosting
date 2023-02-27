import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface Props {
  message?: string;
}

const Spinner = ({ message = 'We are adding something new...' }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='m-5'>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='30'
          visible={true}
        />
      </div>
      <p className='text-sm text-center'>{message}</p>
    </div>
  );
};

export default Spinner;
