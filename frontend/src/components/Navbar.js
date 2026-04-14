import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTodosContext } from '../hooks/useTodosContext';

const Navbar = ({onSearch}) => {
    const { dispatch } = useTodosContext();
    const [search, setSearch] = useState('');

    // Search Task handle 
    const handleSearch = async (e) => {
      const value = e.target.value;
      setSearch(value);
      
      dispatch({type: 'SET_SEARCH', payload: value});
      
      // setTimeout(() => {
      //   onSearch(value);
      // }, 300);
    }

  return (
    <header>
        <div className='container'>
            <Link to="/">
                <h1>To-Do App</h1>
            </Link>
            <input 
              type='text'
              value={search}
              onChange={handleSearch}
              placeholder='Search by title or description (completed / pending)...'
              className='search-bar'
            />
        </div>
    </header>
  )
}

export default Navbar