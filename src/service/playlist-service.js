const dao = require('../server/dao')

function getAllPlaylist (responseCallBack) {
    try {
        dao.connect()
        dao.query('SELECT * from playlist', [], (result) => {
            responseCallBack(result.rows)
            dao.disconnect()
        })
    } catch (error) {
        console.log('error at getAll')
    }
}

function getPlaylistById (responseCallBack, id) {
    try {
        dao.connect()
        dao.query('SELECT * from track WHERE playlist_id = ' + id, [], (result) => {
            responseCallBack(result.rows)
            dao.disconnect()
        })
    } catch (error) {
        console.log('error at getPlaylistById')
    }
}

function addTrackToPlayist (track) {
    try {
        dao.connect()
        dao.query('INSERT INTO track (playlist_id, title, uri, master_id) VALUES ($1, $2, $3, $4) ',
            [track.playlist_id, track.title, track.uri, track.master_id], (result) => {
                dao.disconnect()
            })
    } catch (error) {
        console.log('error at addTrackToPlayist')
    }
}

module.exports = {
    getAllPlaylist: getAllPlaylist,
    getPlaylistById: getPlaylistById,
    addTrackToPlayist: addTrackToPlayist
}
