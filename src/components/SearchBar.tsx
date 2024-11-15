import React from 'react';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => (
  <input
    type="text"
    placeholder="Search for products..."
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 rounded w-full mb-4"
  />
);

export default SearchBar;
