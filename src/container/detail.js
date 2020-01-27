import React, { Component } from 'react'
import DetailResultatVideo from '../component/detail-result-video'
import DetailVideo from '../component/detail-video'

import '../css/detail.css'

class Detail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            input: '',
            searchResult: [],
            detailSelected: null,
            trackOfPlaylist: [],
            switched: 1
        }
        this.onhandleDetailClick = this.onhandleDetailClick.bind(this)
        this.onhandleOptionClick = this.onhandleOptionClick.bind(this)
    }

    componentDidMount () {
        this.loadSearch()
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.playlistSelected.id !== prevProps.playlistSelected.id) {
            this.getTrackList()
            this.loadSearch()
            this.setState({ switched: 1 })
        }
        if (this.props.inputSearch !== prevProps.inputSearch) {
            this.loadSearch()
            this.setState({ switched: 1 })
        }
        if (this.state.detailSelected !== prevState.detailSelected) {
            this.getTrackList()
        }
    }

    loadSearch () {
        fetch('http://localhost:8080/discogs/search', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: this.props.inputSearch })
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    searchResult: response
                })
            })
    }

    getTrackList () {
        fetch('http://localhost:8080/discogs/master/' + this.state.detailSelected.master_id, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ trackOfPlaylist: [...response] })
            })
    }

    onhandleDetailClick (event, selected) {
        this.setState({
            detailSelected: selected,
            switched: 2
        })
    }

    addToPlaylist (param) {
        fetch('http://localhost:8080/playlists/' + param.playlist_id + '/tracks', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
    }

    onhandleOptionClick (event, options) {
        if (event.target.classList.value.includes('fa-plus')) {
            event.target.classList.remove('fa-plus')
            event.target.classList.add('fa-check')
            const param = {
                playlist_id: this.props.playlistSelected.id,
                title: options.title,
                uri: options.uri,
                master_id: options.masterId
            }
            this.addToPlaylist(param)
        }
    }

    render () {
        const lists = this.state.detailSelected !== null ? this.state.detailSelected : null
        console.log(this.state.trackOfPlaylist)
        return (
            <div className='h2'>
                {this.state.switched === 1 && <DetailResultatVideo searchResult={this.state.searchResult} clickEvent={this.onhandleDetailClick} />}
                {this.state.switched === 2 && <DetailVideo detailSelected={lists} trackOfPlaylist={this.state.trackOfPlaylist} optionClickEvent={this.onhandleOptionClick} />}
            </div>
        )
    }
}
export default Detail
