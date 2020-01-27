import React from 'react'

import PlaylistSelect from './playlist-select'
import SearchInput from './search-input'

import '../css/navbar.css'

const NavBar = ({ playlists, selected, playlistClickEvent, searchClickEvent, loadClick }) => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <a className='navbar-brand' onClick={loadClick}>PLAYLIST</a>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon' />
            </button>
            <div className='collapse navbar-collapse ml-4' id='navbarSupportedContent'>
                {(playlists.length !== 0) && <PlaylistSelect lists={playlists} selected={selected} clickEvent={playlistClickEvent} />}
                <SearchInput clickEvent={searchClickEvent} />
            </div>
        </nav>
    )
}

export default NavBar
