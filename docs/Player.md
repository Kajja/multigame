# Player





* * *

### Player(socket) 

Player constructor function.

**Parameters**

**socket**: `Object`, socket that is to be associated with the created Player object



### getState() 

Get a player's state property.

**Returns**: `Object`, state - state of the player


### setState(object) 

Set a player's state property.

**Parameters**

**object**: `Object`, state or part of state that shall be updated



### update(state) 

Sends a state to the client connected to the socket that is
associated with the Player object.
Overrides update() in Observer, adds the player's state to 
the state that is sent to client.

**Parameters**

**state**: `Object`, game state




* * *










