'use strict'
const playlistService = require('./src/service/playlist-service')
const express = require('express')
const bodyParser = require('body-parser')
const Discogs = require('disconnect').Client
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// to test on different ports
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.use(express.static('dist'))
const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'

const discogs = new Discogs({ userToken: 'nSoOgbeWJvVsavNOeItXgrmjXXuIBclNedsfcVlJ' })

function responseCallBack (response) {
    const callBack = function (json) {
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
        response.end(JSON.stringify(json))
    }
    return callBack
}

app.get('/playlists', function (request, response) {
    playlistService.getAllPlaylist(responseCallBack(response))
})

app.get('/playlists/:id/tracks', function (request, response) {
    playlistService.getPlaylistById(responseCallBack(response), request.params.id)
})

app.post('/playlists/:id/tracks', function (request, response) {
    const track = request.body
    playlistService.addTrackToPlayist(track)
})

// get all tracks from discogs api
app.post('/discogs/search', function (request, response) {
    try {
        const query = request.body.query
        discogs.database().search(query, { type: 'master', per_page: 2000 }, function (err, data) {
            if (err) {
                throw err
            }
            responseCallBack(response)(data.results)
        })
    } catch (error) {
        responseCallBack(response)(error.message)
    }
})

// get track info (with youtube link) from discogs api
app.get('/discogs/master/:id', function (request, response) {
    try {
        discogs.database().getMaster(request.params.id, function (err, master) {
            if (err) {
                throw err
            }
            responseCallBack(response)(master.videos)
        })
    } catch (error) {
        responseCallBack(response)(error.message)
    }
})
app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
