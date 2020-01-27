
const { Client } = require('pg')

let client = {}

function connect () {
    client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'tp_music',
        user: 'postgres',
        password: 'postgres'
    })

    client.connect((error) => {
        try {
            if (error) {
                throw error
            }
        } catch (error) {
            console.log(error.message)
        }
    })
}

function query (query, values, resultCallback) {
    client.query(query, values, (error, result) => {
        try {
            if (error) {
                throw error
            }
            resultCallback(result)
        } catch (error) {
            resultCallback(error.message)
        }
    })
}

function disconnect () {
    client.end()
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    query: query
}
