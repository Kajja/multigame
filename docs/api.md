## Members
<dl>
<dt><a href="#_">_</a></dt>
<dd><p>Module that returns a constructor for creating games.</p>
</dd>
<dt><a href="#ManagerModule">ManagerModule</a></dt>
<dd><p>Manager constructor function, implemented in a closure,
that creates objects with methods that can be used 
to manage games.</p>
</dd>
<dt><a href="#_">_</a></dt>
<dd><p>A module for creating Player objects</p>
</dd>
<dt><a href="#socketIO">socketIO</a></dt>
<dd><p>Module that encapulate the specifics of the 
Web Socket server implementation and ties it
to the rest of the multigame-platform.</p>
</dd>
<dt><a href="#GameProxy">GameProxy</a></dt>
<dd><p>GameProxy that exposes methods used to communicate with
a specific game on the multigame server.</p>
</dd>
<dt><a href="#Verifyer">Verifyer</a></dt>
<dd><p>Module that returns a constructor function
for ConnectionVerifyer objects.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#Game">Game(spec)</a></dt>
<dd><p>Game constructor function.</p>
</dd>
<dt><a href="#Observer">Observer(socket)</a></dt>
<dd><p>Observer constructor function.</p>
</dd>
<dt><a href="#Player">Player(socket)</a></dt>
<dd><p>Player constructor function.</p>
</dd>
<dt><a href="#Server">Server(server, verifiyer)</a> ⇒ <code>Object</code></dt>
<dd><p>Server implementation using socket.io.</p>
</dd>
</dl>
<a name="_"></a>
## _
Module that returns a constructor for creating games.

**Kind**: global variable  
<a name="ManagerModule"></a>
## ManagerModule
Manager constructor function, implemented in a closure,that creates objects with methods that can be used to manage games.

**Kind**: global variable  
<a name="_"></a>
## _
A module for creating Player objects

**Kind**: global variable  
<a name="socketIO"></a>
## socketIO
Module that encapulate the specifics of the Web Socket server implementation and ties itto the rest of the multigame-platform.

**Kind**: global variable  
<a name="GameProxy"></a>
## GameProxy
GameProxy that exposes methods used to communicate witha specific game on the multigame server.

**Kind**: global variable  
<a name="Verifyer"></a>
## Verifyer
Module that returns a constructor functionfor ConnectionVerifyer objects.

**Kind**: global variable  
<a name="Game"></a>
## Game(spec)
Game constructor function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| spec | <code>Object</code> | game specification |


* [Game(spec)](#Game)
  * [.getId()](#Game+getId) ⇒ <code>String</code>
  * [.getName()](#Game+getName) ⇒ <code>String</code>
  * [.getState()](#Game+getState) ⇒ <code>Object</code>
  * [.getType()](#Game+getType) ⇒ <code>String</code>
  * [.setState(object)](#Game+setState)
  * [.getPlayers()](#Game+getPlayers) ⇒ <code>Array</code>
  * [.getPlayer(socket)](#Game+getPlayer) ⇒ <code>Object</code>
  * [.registerObserver(observer)](#Game+registerObserver)
  * [.removeObserver(socket)](#Game+removeObserver)
  * [.notify()](#Game+notify)
  * [.triggerEvent(event)](#Game+triggerEvent)
  * [.socketSetup(socket)](#Game+socketSetup)
  * [.disconnectHandler(socket)](#Game+disconnectHandler)

<a name="Game+getId"></a>
### game.getId() ⇒ <code>String</code>
Get the id of the game.

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>String</code> - id - game id  
<a name="Game+getName"></a>
### game.getName() ⇒ <code>String</code>
Get the name of the game.

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>String</code> - name - game name  
<a name="Game+getState"></a>
### game.getState() ⇒ <code>Object</code>
Get the game state object.

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>Object</code> - state - game state object  
<a name="Game+getType"></a>
### game.getType() ⇒ <code>String</code>
Get the type of game.

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>String</code> - type - game type  
<a name="Game+setState"></a>
### game.setState(object)
Set the state object of the game.

**Kind**: instance method of <code>[Game](#Game)</code>  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | state object or a part of the state object that should be updated |

<a name="Game+getPlayers"></a>
### game.getPlayers() ⇒ <code>Array</code>
Get the players of the game.

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>Array</code> - players - array with all players  
<a name="Game+getPlayer"></a>
### game.getPlayer(socket) ⇒ <code>Object</code>
Get a specific player.

**Kind**: instance method of <code>[Game](#Game)</code>  
**Returns**: <code>Object</code> - player - player object or undefined  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Object</code> | socket by which the player is identified |

<a name="Game+registerObserver"></a>
### game.registerObserver(observer)
Register and observer of the game, that will be informed of game events.

**Kind**: instance method of <code>[Game](#Game)</code>  

| Param | Type |
| --- | --- |
| observer | <code>Object</code> | 

<a name="Game+removeObserver"></a>
### game.removeObserver(socket)
Remove an object as an observer to the game.

**Kind**: instance method of <code>[Game](#Game)</code>  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Object</code> | a socket that is used to identify the object that is to be removed |

<a name="Game+notify"></a>
### game.notify()
Notify all observers of a change in the game state.

**Kind**: instance method of <code>[Game](#Game)</code>  
<a name="Game+triggerEvent"></a>
### game.triggerEvent(event)
Trigger a game event, 'manually'.

**Kind**: instance method of <code>[Game](#Game)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | on the format {type: <event type>, ...} |

<a name="Game+socketSetup"></a>
### game.socketSetup(socket)
Setting up socket event handlers.

**Kind**: instance method of <code>[Game](#Game)</code>  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Object</code> | socket which is to be set up |

<a name="Game+disconnectHandler"></a>
### game.disconnectHandler(socket)
Actions to do when a socket is disconnected.

**Kind**: instance method of <code>[Game](#Game)</code>  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Object</code> | socket that is disconnected |

<a name="Observer"></a>
## Observer(socket)
Observer constructor function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Object</code> | socket that shall be associated with the created observer |


* [Observer(socket)](#Observer)
  * [.getSocket()](#Observer+getSocket) ⇒ <code>Object</code>
  * [.update(state)](#Observer+update)

<a name="Observer+getSocket"></a>
### observer.getSocket() ⇒ <code>Object</code>
Get the socket associated with an observer.

**Kind**: instance method of <code>[Observer](#Observer)</code>  
**Returns**: <code>Object</code> - socket - socket associated with an observer  
<a name="Observer+update"></a>
### observer.update(state)
Sends a state to the client connected to the socket that isassociated with the Observer object.

**Kind**: instance method of <code>[Observer](#Observer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | game state |

<a name="Player"></a>
## Player(socket)
Player constructor function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Object</code> | socket that is to be associated with the created Player object |


* [Player(socket)](#Player)
  * [.getState()](#Player+getState) ⇒ <code>Object</code>
  * [.setState(object)](#Player+setState)
  * [.update(state)](#Player+update)

<a name="Player+getState"></a>
### player.getState() ⇒ <code>Object</code>
Get a player's state property.

**Kind**: instance method of <code>[Player](#Player)</code>  
**Returns**: <code>Object</code> - state - state of the player  
<a name="Player+setState"></a>
### player.setState(object)
Set a player's state property.

**Kind**: instance method of <code>[Player](#Player)</code>  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | state or part of state that shall be updated |

<a name="Player+update"></a>
### player.update(state)
Sends a state to the client connected to the socket that isassociated with the Player object.Overrides update() in Observer, adds the player's state to the state that is sent to client.

**Kind**: instance method of <code>[Player](#Player)</code>  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Object</code> | game state |

<a name="Server"></a>
## Server(server, verifiyer) ⇒ <code>Object</code>
Server implementation using socket.io.

**Kind**: global function  
**Returns**: <code>Object</code> - server - WebSocket server  

| Param | Type | Description |
| --- | --- | --- |
| server | <code>Object</code> | http server |
| verifiyer | <code>Object</code> | used to verify if the client url is ok |

