

const models = require('../models');

const { Message, User } = models;

/**
 * 
 * @param {function}io - socket-io server
    
 @returns  {function} return io with events listeners attached
 */

//Strating WebSocket Server
const socketEvents = (io) => {


    io.on('connection', (socket) => {
        console.log(`Un utilisateur est connecté Id:${socket.id} `);
        console.log(socket.handshake.auth)

    });

}

module.exports = socketEvents; 