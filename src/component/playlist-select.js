import React from 'react'

import '../css/list.css'

const PlaylistSelect = ({ lists, selected, clickEvent }) => {
    return (
        <ul className='navbar-nav mr-auto'>
            <li className='dropdown show active dropright'>
                <a className='btn btn-sm btn-secondary dropdown-toggle text-light' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    {selected.title + '  '}
                </a>
                <div onClick={clickEvent} className='dropdown-menu lists' aria-labelledby='navbarDropdown'>
                    {lists.map((item) => (<a key={item.id} id={item.id} className='dropdown-item'>{item.title}</a>))}
                </div>
            </li>
        </ul>
    )
}

export default PlaylistSelect
