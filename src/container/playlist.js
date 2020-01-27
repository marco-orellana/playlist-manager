import React, { Component } from 'react'
import YouTube from 'react-youtube'

import '../css/playlist.css'

class Playlist extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tracklists: [],
            currentVideoInfos: null
        }
        this.handleTrackListClickEvent = this.handleTrackListClickEvent.bind(this)
        this.handleEndVideoEvent = this.handleEndVideoEvent.bind(this)
    }

    componentDidMount () {
        if (this.state.tracklists.length > 0) {
            this.setState({
                currentVideoInfos: this.state.tracklists[0]
            })
        }
        this.loadTracklist()
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.selected.id !== prevProps.selected.id) {
            this.loadTracklist()
            this.showTracklist()
        }
        if (this.state.currentVideoInfos !== prevState.currentVideoInfos) {
            this.loadTracklist()
            this.showTracklist()
        }
    }

    loadTracklist () {
        fetch('http://localhost:8080/playlists/' + this.props.selected.id + '/tracks', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    tracklists: [...response]
                })
            })
    }

    setTrackStyle () {
        const trackSelected = this.currentVideoInfos
        const allLi = event.target.parentNode.childNodes

        Object.values(allLi).map(function (li) {
            li.classList.remove('bg-secondary', 'text-light')
        })
        trackSelected.classList.add('bg-secondary', 'text-light')
    }

    handleTrackListClickEvent (event) {
        const trackSelected = event.target
        const allLi = event.target.parentNode.childNodes

        Object.values(allLi).map(function (li) {
            li.classList.remove('bg-secondary', 'text-light')
        })
        trackSelected.classList.add('bg-secondary', 'text-light')
        this.setState({
            currentVideoInfos: this.state.tracklists[trackSelected.id]
        })
    }

    handlePrevClickEvent (event) {

    }

    handleEndVideoEvent () {
        console.log(YouTube.PlayerState)
    }

    getVideoId (url) {
        return url.substr(32)
    }

    showTracklist () {
        let build = ''
        if (this.state.tracklists.length) {
            build = (
                <div className='container m-3 d-flex'>
                    {this.state.currentVideoInfos !== null &&
                        <div className='container-video m-3 col-sm-8'>
                            <div className='bg-light p-3'>
                                <h1 className='display-6 text-center'> {this.state.tracklists.title} </h1>
                                <div className='embed-responsive embed-responsive-16by9'>
                                    <iframe src={'https://www.youtube.com/embed/' + this.getVideoId(this.state.currentVideoInfos.uri)} frameBorder='0' autoplay='1' allow='accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />

                                </div>
                                <hr className='my-4' />
                                <button className='btn btn-outline-dark m-2'><i className='fas fa-backward' /></button>
                                <button className='btn btn-outline-dark m-2'><i className='fas fa-forward' /></button>
                                <span className='h3 m-5 pt-2'>{this.state.currentVideoInfos.title}</span>
                                <p />
                            </div>
                        </div>}
                    <div className='container-list m-3 col-sm-5'>
                        <h1 className=''>Tracks </h1>
                        <ul className='list-group' onClick={this.handleTrackListClickEvent}>
                            {(this.state.tracklists !== null) && this.state.tracklists.map((item, index) => (<li key={item.id} id={index} name={item.master_id} className='list-group-item list-group-item-action'>{item.title}</li>))}
                        </ul>
                    </div>
                </div>
            )
        } else {
            build = (
                <div className='container-list m-3'>
                    <h1 className=''> THIS PLAYLIST IS EMPTY </h1>
                </div>
            )
        }
        return build
    }

    render () {
        return (
            <section className='main d-flex justify-content-center p-3 playlist'>
                {this.showTracklist()}
            </section>
        )
    }
}

export default Playlist
