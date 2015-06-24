/**
 * Multigame client
 * Exposes a GameProxy object that other scripts use to communicate with
 * the multigame server.
 */

// TODO: Remove socket.io dependency

/**
 * GameProxy that exposes methods used to communicate with
 * a specific game on the multigame server.
 */
var GameProxy = (function(){

    // Latest state of the game on the server
    var state = {};

    // Registred observer to the GameProxy
    var observers = []; 
    
    var socket;

    /**
     * Connecting to a game on the multigame server
     *
     * @param url of the multigame server
     * @param id of the game to connect to
     * @param type of client i.e. player or observer
     */
    function connect(url, gameId, clientType) {

        socket = io.connect(url);

        // Setting up event handlers for socket events
        
        // When a client is connected to the server
        socket.on('connect', function() {

            console.log('Connected to server!');
            
            /**
             * Trying to connect to a specific game.
             * If no game with the specified id => the socket will be disconnected.
             */
            socket.emit('game_connect', {gameId: gameId});

            // Registering a new client in the game
            if (clientType === 'player'){
                eventHandler({type: 'add_player'});
            } else {
                eventHandler({type: 'add_observer'});
            }
        });

        // Connection error
        socket.on('connect_error', function(e) {
            console.log('Not connected ' + e);
        });

        // Error status from server
        socket.on('error', function(e) {
            console.log(e);
        });

        // Server disconnect
        socket.on('disconnect', function(reason) {
            console.log('Disconnected:' + reason);
        });

        // Messages of type 'state' will be distributed amongst GameProxy observers
        socket.on('state', function(data) {
            GameProxy.notify(data);
        });
    };

    /**
     * Registering an observer of the GameProxy object.
     *
     * @param object that shall observer the GameProxy object
     */
    function registerObserver(observer) {
        observers.push(observer);
    };

    /**
     * Notifying all observers.
     * ('Subject push' observer pattern)
     *
     * @param data that shall be distributed to observers
     */
    function notify(data) {
        observers.forEach(function(o) { o.update(data); });
    };

    /**
     * Event handler that other scripts can use when they
     * want the event to reach the game on the server, that
     * the client is connected to.
     *
     * @param event that is to be handled by the game on the server
     */
    function eventHandler(event) {

        // Sends the 'event' as a message to the server
        socket.emit('msg', JSON.stringify(event));
    };

    return {
        connect: connect,
        registerObserver: registerObserver,
        notify: notify,
        eventHandler: eventHandler,
    };
})();