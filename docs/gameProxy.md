# gameProxy





* * *

### connect(url, gameId, clientType) 

Connecting to a game on the multigame server.

**Parameters**

**url**: `String`, url of the multigame server

**gameId**: `String`, id of the game to connect to

**clientType**: `String`, type of client i.e. player or observer



### registerObserver(observer) 

Registering an observer of the GameProxy object.

**Parameters**

**observer**: `Object`, object that shall observer the GameProxy object



### notify(data) 

Notifying all observers.
('Subject push' observer pattern)

**Parameters**

**data**: `Object`, data that shall be distributed to observers



### eventHandler(event) 

Event handler that other scripts can use when they
want the event to reach the game on the server, that
the client is connected to.

**Parameters**

**event**: `Object`, event that is to be handled by the game on the server




* * *










