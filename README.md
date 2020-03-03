# playlist-manager
Web Application that allows the user to have multiple playlists fetched from the database, search the musics from the Discogs APi and add them to the desired playlist. The client was written in Javascript/React. The server (made with Node.js) offers a REST API that communicate with JSON (made with Express.js) and allows persistence in a PostgreSQL database. We had a 1 week deadline for this project.

I worked on the server side of the project (Server.js, Dao.js, Playlist.js).

# How to install
1. Download the repository and download the [Visual Studio Code](https://code.visualstudio.com/download) 
2. Download [PostgreSQL](https://www.postgresql.org/download/) . If you don't have it, choose _postgres_ as user and password
3. Open PostgreSQL and create a database named tp_music and run tp_music.sql (at the root of the project)
4. Add project in the IDE
5. If you already had PostgreSQL, configure your database connection: you can change the default database connection username and password to your owns by changing the user or password variables in the src/server/dao.js file
6. At the root of the project, in the terminal do _npm install_, then _npm start_ and finally _npm run dev_
