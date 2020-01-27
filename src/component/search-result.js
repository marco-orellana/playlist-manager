import React from 'react'

const SearchResult = ({ lists, clickEvent }) => {
    return (
        <ul className='list-group' onClick={clickEvent}>
            {lists.map((item) => (<li key={item.id} className='list-group-item list-group-item-action'>{item.title}</li>))}
        </ul>
    )
}

export default SearchResult
