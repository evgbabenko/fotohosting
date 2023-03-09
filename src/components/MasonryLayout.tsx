import React from 'react';
import { Pin } from '../../typings';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PinCard from './PinCard';

interface Props {
  pins: Pin[] | null;
}

const breakpointColumnsObj = {
  1800: 4,
  1200: 4,
  1000: 3,
  500: 1,
};

const MasonryLayout = ({ pins }: Props) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={breakpointColumnsObj}
      className='w-full'
    >
      <Masonry>
        {pins?.map((pin) => (
          <PinCard pin={pin} key={pin._id} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryLayout;
