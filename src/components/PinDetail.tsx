import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import MasonryLayout from './MasonryLayout';

import { client, urlFor } from '../utils/sanity';
import { SanityUser } from '../../typings';

interface Props{
  user: SanityUser | null;
}

const PinDetail = ({user}: Props) => {
  return (
    <div>PinDetail</div>
  )
}

export default PinDetail