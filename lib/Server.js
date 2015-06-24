/**
 * Module that encapulate the specifics of the 
 * Web Socket server implementation and ties it
 * to the rest of the multigame-platform.
 */

// External module dependencies
var socketIO = require('socket.io');

// Internal module dependencies
var Manager = require('./Manager');

/**
 * Server implementation using socket.io.
 *
 * @param http server object
 * @param verifiyer, used to verify if the client url is ok
 * @return WebSocket server
 */
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

        /**
         * The game is responsible for setting up the rest of
         * the socket event handlers.
         */
        game.socketSetup(socket);

      });
    });

    return ioServer;
};

module.exports = Server;