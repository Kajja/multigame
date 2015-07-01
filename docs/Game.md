# Global





* * *

### Game(spec) 

Game constructor function.

**Parameters**

**spec**: `Object`, game specification



### getId() 

Get the id of the game.

**Returns**: `String`, id - game id


### getName() 

Get the name of the game.

**Returns**: `String`, name - game name


### getState() 

Get the game state object.

**Returns**: `Object`, state - game state object


### getType() 

Get the type of game.

**Returns**: `String`, type - game type


### setState(object) 

Set the state object of the game.

**Parameters**

**object**: `Object`, state object or a part of the state object that should be updated



### getPlayers() 

Get the players of the game.

**Returns**: `Array`, players - array with all players


### getPlayer(socket) 

Get a specific player.

**Parameters**

**socket**: `Object`, socket by which the player is identified

**Returns**: `Object`, player - player object or undefined


### registerObserver(observer) 

Register and observer of the game, that will be informed of game events.

**Parameters**

**observer**: `Object`, Register and observer of the game, that will be informed of game events.



### removeObserver(socket) 

Remove an object as an observer to the game.

**Parameters**

**socket**: `Object`, a socket that is used to identify the object that is to be removed



### notify() 

Notify all observers of a change in the game state.



### triggerEvent(event) 

Trigger a game event, 'manually'.

**Parameters**

**event**: `Object`, on the format {type: <event type>, ...}



### socketSetup(socket) 

Setting up socket event handlers.

**Parameters**

**socket**: `Object`, socket which is to be set up



### disconnectHandler(socket) 

Actions to do when a socket is disconnected.

**Parameters**

**socket**: `Object`, socket that is disconnected




* * *










