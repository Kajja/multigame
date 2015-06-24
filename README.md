Multigame
=========

Multigame is a library, or perhaps more of a platform, to help you manage and build multiplayer games. It takes care of connecting players and viewers (=spectators) to games and handles the communication between them.

There is a server part and a client part of the library. The client part exposes an object that acts a bit like a proxy for the game that runs on the server, and that the client is connected to.

A multigame server can handle many different multiplayer games instances, of different or the same type, simultaneously.  

How to use it
-------------

When writing a game, using this platform, you create a server object, called a Rules object. It should contain game logic and adhere to the interface specified in the platform's Rules module. You should only need one Rules object for all your game instances (if they are of the same type that is). A Rule object should be stateless.

You will need a client part of your game too. The client part has access to a game proxy object, that is part of the platform, which takes care of the communication with the server. You decide where you want to put the game logic, server and/or client side.

The platform has no methods like 'createGame' or 'createPlayer', you create games and players yourself, using the Game and Player constructor functions and then register them with the Manager object or Game object respectively.

A Game and a Player object have a property called 'state'. It is empty from the start. A Game's 'state' is what is sent to all who are connected to a Game when there has been an update to the state. If the client is a player it will also receive the state of the player object, that resides on the server and is associated with the client/socket.

You yourself fill the state properties with whatever that is relevant for your game. You can also add whatever you need to a Game or Player object (properties and methods), just remember that it is the 'state'-properties that are sent to clients.

Protocol between server and client
----------------------------------
Client generated events:

* connection          
* disconnect          
* error (data: error)           
* game_connect (data: game id)
* add_player
* add_observer
* msg (data: game specific event data)

Server generated events:

* connect
* connect_error (data: error)
* error (data: error)
* disconnect (data: disconnect reason)
* state (data: game and possibly player state)


Documentation to come:
----------------------

* How to set up accepted domains
* Step by step explanation on how the game server works


TODO
----
These are things that should be addressed:

* Remove socket.io dependency
* Be able to connect to a db for players/observers (?!)
* A better way to handle game and player states