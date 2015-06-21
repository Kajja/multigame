//***** Game client proxy *****//
// TODO: Remove socket.io dependency

var GameProxy = (function(){

    var state = {};     // Latest state of the game on the server
    var observers = []; // Registred observer to the GameProxy
    var socket;

    function connect(url, gameId, clientType) {

        socket = io.connect(url);

        //***** Setting up event handlers for socket events ****//
        
        // Client connected to server
        socket.on('connect', function() {

            console.log('Connected to server!');
            
            // Trying to connect to a specific game
            // If no game with the specified id => the socket will be disconnected
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

    function registerObserver(observer) {
        observers.push(observer);
    };

    function notify(data) {
        observers.forEach(function(o) { o.update(data); });
    };

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