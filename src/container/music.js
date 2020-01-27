import React, { Component } from 'react'
import Navbar from '../component/navbar'
import Playlist from './playlist'
import Detail from './detail'

class Music extends Component {
    constructor () {
        super()
        this.state = {
            playlists: [],
            selected: null,
            inputSearch: '',
            switched: 1
        }
        this.onhandlePlaylistClickEvent = this.onhandlePlaylistClickEvent.bind(this)
        this.onhandleSearchClickEvent = this.onhandleSearchClickEvent.bind(this)
        this.onloadClickEvent = this.onloadClickEvent.bind(this)
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    playlists: [...response]
                })
            })
    }

    onloadClickEvent () {
        this.setState({ switched: 1 })
    }

    onhandlePlaylistClickEvent () {
        this.setState({
            selected: this.state.playlists[event.target.id - 1]
        })
    }

    onhandleSearchClickEvent (event) {
        const input = event.target.parentNode.firstElementChild
        const value = input.value
        input.value = ''
        if (value.length !== 0) {
            this.setState({
                inputSearch: value,
                switched: 2
            })
        }
    }

    render () {
        const playlistSelect = (this.state.selected === null) ? this.state.playlists[0] : this.state.selected
        return (
            <div className=''>
                {(this.state.playlists.length !== 0) &&
                <Navbar
                    playlists={this.state.playlists}
                    selected={playlistSelect}
                    playlistClickEvent={this.onhandlePlaylistClickEvent}
                    searchClickEvent={this.onhandleSearchClickEvent}
                    loadClick={this.onloadClickEvent}
                />}
                {(this.state.switched === 1 && this.state.playlists.length !== 0) && <Playlist selected={playlistSelect} />}
                {(this.state.switched === 2 && this.state.playlists.length !== 0) && <Detail inputSearch={this.state.inputSearch} playlistSelected={playlistSelect} />}
            </div>
        )
    }
}
export default Music
