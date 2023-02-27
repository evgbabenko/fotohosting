import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client, urlFor } from '../utils/sanity';
import MasonryLayout from './MasonryLayout'; 
import Spinner from './Spinner';
import { feedQuery } from '../utils/data';
import { Pin } from '../../typings';

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState<Pin[] | null>(null);
  const { categoryId } = useParams();

  useEffect(() => {
   const query = feedQuery(categoryId && categoryId)
    
    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
  })

  },[categoryId])

  if (loading) return <Spinner />

  return (
    <div className='relative w-full '>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed