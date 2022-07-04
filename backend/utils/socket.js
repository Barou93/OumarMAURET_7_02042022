
/**
 *
 * @param {function}io - socket-io server

 @returns  {function} return io with events listeners attached
 */

//Strating WebSocket Server
/*const socketEvents = (io) => {


    io.on('connection', (socket) => {
        console.log(`Un utilisateur est connecté Id:${socket.id} `);

        socket.emit('newmessage', (message) => {

        })

    });

}

//module.exports = socketEvents; */