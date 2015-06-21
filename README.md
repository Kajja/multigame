Sätta upp accepterade domäner

Steg för steg hur själva uppsättningen av spelservern ska fungera

The multigame is a library to help you manage many multiplayer games, at the same time, on a server. It takes care of connecting players and viewers to games and handles the communication between them. A viewer = spectator.

There is a serverpart and a client part of the library. The client part exposes an object that acts a bit like a proxy for the game that the client is connected to.

When writing a game, using this library, you create a server object, called a Rules object. It should contain game logic and adhere to the interface specified in the library's Rules module. You should only need one Rule object for all your Game instances (if they are of the same type of game, that is). The Rule object should be stateless.

You will need a client part of your game too. The client part has access to a game proxy object, which takes care of the communication with the server. You decide where you want to put the game logic, server and/or client side.

The library has no methods like 'createGame' or 'createPlayer', you create games and players yourself, using the Game and Player constructor functions and then register them with the Manager object or a Game object respectively.

A Game and a Player object have a property called 'state', which is empty from the start. A Game's 'state' is what is sent to all who are listening to a Game when there has been an update to the state. If the client is a player it will also receive the state of the server's Player object, associated with this client.

You yourself fill the state properties with whatever that is relevant for your game. Add whatever you need to a Game or Player object (properties and methods), just remember that it is the 'state'-properties that is sent to clients.

Protocol for the platform:

Client generated events:
EVENT               DATA
-----               ----
connection          {?}
disconnect          {?}
error               {?}
game_connect        {gameId: id} - Handled by Manager
(add_player          {name: name} - Handled by rule, since there might be a limit on number of players etc.)
(add_observer        {} - Handled by rule, since there might be a limit on number of observers etc.)
msg                 {what ever = game specific} - Handled by game rules

Server generated events:
EVENT               DATA
-----               ----
connect             {?}
connect_error       {?}
error               {?}
disconnect          {?}
state               {what ever = game specific}

When a player/observer is connected to a game:
- Check if it is possible to do a WebSocket-connection to the server (?)
- Check if it is possible to connect to a specific game ('game_connect')

Game specifics:
- Register a player/observer for the game ('add_player')


Från Game:
event = {type: , whatever that is relevant for this event}

TODO:
Remove socket.io dependency
Have a db for players/observers
