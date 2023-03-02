import React, {useState, useEffect} from 'react'
import { Pin } from '../../typings';
import MasonryLayout from './MasonryLayout'; 
import Spinner from './Spinner';
import { client } from '../utils/sanity';
import { searchQuery } from '../utils/data';

interface Props {
  searchTerm: string;

}

const Search = ({ searchTerm }: Props) => {
  const [searchResult, setSearchResult] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchTerm &&
      client
        // eslint-disable-next-line react-hooks/exhaustive-deps
        .fetch(searchQuery(searchTerm.toLowerCase()))
        .then((data) => {
          setSearchResult(data);
          setLoading(false);
        });
  }, [searchTerm]);
  console.log(searchResult);

  if (searchTerm.length === 0) return (<div>Empty search query...</div>)
  if (loading) return <Spinner message='Searching...' />
  
  return (
    <div>
      Search string {searchTerm}
      {searchResult && <MasonryLayout pins={searchResult} />}
    </div>
  );
};

export default Search