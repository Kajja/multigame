//***** Module that returns a constructor for creating games *****//

var Player = require('./Player');
var _ = require('lodash');

var Game = function(spec) {

    // TODO: Borde vara privata variabler

    // ID
    if (spec.id === undefined) throw new Error('A game must have an id');
    this.id = spec.id;

    // Name
    this.name = spec.name || '';
    
    // Game rules are handled by a specific game Rules object
    if (spec.rules === undefined) throw new Error('A game must have rules');
    this.gameRules = spec.rules;

    // Observers to the game including players
    this.observers = [];

    // For a fast access to players
    this.players = [];

    // Where a Rule object should put game specifics
    this.state = {};

    // The game Rule object initiates the game object
    spec.rules.init(this);
};

Game.prototype.getId = function() { return this.id; };

Game.prototype.getName = function() { return this.name; };

Game.prototype.getState = function() { return this.state; };

Game.prototype.getType = function() { return this.gameRules.getType(); }

Game.prototype.setState = function(object) { 
    _.merge(this.state, object);
};

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.getPlayer = function(socket) {
    return this.getPlayers().filter(function(o) { return o.getSocket() === socket; })[0];
};

Game.prototype.registerObserver = function(observer) { 
    this.observers.push(observer);

    // If the observer is a player, register the object in "players" as well
    if (observer instanceof Player) {
        this.players.push(observer);
    }
};

Game.prototype.removeObserver = function(socket) {
    this.observers = this.observers.filter(function(o) { return o.getSocket() !== socket; });

    // Remove the reference from the 'players' array as well
    this.players = this.players.filter(function(p) { return p.getSocket() !== socket; });
};

Game.prototype.notify = function() {

    // Inform the observers of the changed state
    var state = _.merge({
            gameId: this.getId()
//            ,players: this.getPlayers() // Funkar inte får RangeError, call stack range exceeded
        }, this.state);

    this.observers.forEach(function(o) { o.update(state); });
};

// Event format: {type: 'whatever', ...}
Game.prototype.triggerEvent = function(event) { // TODO: Should the events handle themself?!
    
    switch(event.type) {    // TODO: Should this handle all events even disconnect and error

        default:
            this.gameRules.eventHandler(event, this); // TODO: Socket?
    }
};

// The game is responsible for setting up socket event handlers
Game.prototype.socketSetup = function(socket) { // TODO: Rethink this, the event handling setup

    var _this = this // TODO: Change to bind

    // Handling of socket events that are on a general level:

    // A client has disconnected
    socket.on('disconnect', this.disconnectHandler.bind(this, socket));

    socket.on('error', function(data) { console.log(data); }); // TODO: Needed for socket.io

    // All 'msg' events are handled by the Rules-object
    socket.on('msg', function(data) {
        _this.gameRules.eventHandler(JSON.parse(data), _this, socket); 
    });
};

Game.prototype.disconnectHandler = function(socket) {
    this.removeObserver(socket);
    this.gameRules.eventHandler({type: 'disconnect'}, this, socket);
    this.notify();
};

// Idea: Have a fixed update interval to minimize sends to observers, bunch together things

module.exports = Game;