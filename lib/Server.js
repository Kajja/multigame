//***** Module that encapulate the specifics of the Web Socket server implementation *****//
//***** And ties it to the rest of the multigame-platform.

/**
* Gränssnitt:
*   socket.on('event', function()...)
*   socket.send()
*   socket.
*/

var Manager = require('./Manager');
var socketIO = require('socket.io');

//***** Server implementation using socket.io *****//
function Server(httpServer, verifyer) {

    var ioServer = socketIO(httpServer);

    // Set up accepted domains
    ioServer.origins(verifyer.listAll());

    ioServer.on('connection', function(socket) {
      
      // A client wants to connect to a specific game
      socket.on('game_connect', function(data) {

        console.log(data);

        // Check if there is a game with the requested id
        var game = Manager.getGame(data.gameId);

        if (game === null) {
          // There was no such game, disconnect the client
          socket.error('No game matched the supplied id');
          socket.disconnect();
          return;
        }

        // The game is responsible for setting up the rest of
        // the socket event handlers
        game.socketSetup(socket);

      });
    });

    return ioServer;
};

module.exports = Server;