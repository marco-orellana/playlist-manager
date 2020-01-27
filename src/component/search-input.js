import React from 'react'

const SearchInput = ({ clickEvent }) => {
    return (
        <div className='form-inline my-2 my-lg-0'>
            <input className='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search' />
            <button onClick={clickEvent} className='btn btn-outline-light my-2 my-sm-0'>Search</button>
        </div>
    )
}

export default SearchInput
