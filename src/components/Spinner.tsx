import React from 'react';
import { RotatingLines, ThreeCircles } from 'react-loader-spinner';

interface Props {
  message?: string;
}

const Spinner = ({ message = 'We are adding something new...' }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='m-5'>
        <ThreeCircles
          height='100'
          width='100'
          color='rgb(125,211,252)'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
          ariaLabel='three-circles-rotating'
          outerCircleColor=''
          innerCircleColor=''
          middleCircleColor=''
        />
      </div>
      <p className='text-sm text-center'>{message}</p>
    </div>
  );
};

export default Spinner;
