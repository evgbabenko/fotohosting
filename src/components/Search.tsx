import React from 'react'

interface Props {
  searchTerm: any;
  setSearchTerm: any;
}

const Search = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div>Search string {searchTerm}
    
    </div>
  );
};

export default Search