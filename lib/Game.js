/**
 * Module that returns a constructor for creating games.
 */

// External modules
var _ = require('lodash');

// Internal modules
var Player = require('./Player');

/**
 * Game constructor function.
 *
 * @param {Object} spec - game specification
 */
var Game = function(spec) {

    // TODO: Should be private variables

    // ID
    if (spec.id === undefined) throw new Error('A game must have an id');
    this.id = spec.id;

    // Name
    this.name = spec.name || '';
    
    // Game rules are handled by a specific game Rules object (Strategy pattern)
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

/**
 * Get the id of the game.
 *
 * @return {String} id - game id
 */
Game.prototype.getId = function() { return this.id; };

/**
 * Get the name of the game.
 *
 * @return {String} name - game name
 */
Game.prototype.getName = function() { return this.name; };

/**
 * Get the game state object.
 *
 * @return {Object} state - game state object
 */
Game.prototype.getState = function() { return this.state; };

/**
 * Get the type of game.
 *
 * @return {String} type - game type
 */
Game.prototype.getType = function() { return this.gameRules.getType(); };

/**
 * Set the state object of the game.
 *
 * @param {Object} object - state object or a part of the state object that should be updated
 */
Game.prototype.setState = function(object) { 
    _.merge(this.state, object);
};

/**
 * Get the players of the game.
 *
 * @return {Array} players - array with all players
 */
Game.prototype.getPlayers = function() {
    return this.players;
};

/**
 * Get a specific player.
 *
 * @param {Object} socket - socket by which the player is identified
 * @return {Object} player - player object or undefined
 */
Game.prototype.getPlayer = function(socket) {
    return this.getPlayers().filter(function(o) { return o.getSocket() === socket; })[0];
};

/**
 * Register and observer of the game, that will be informed of game events.
 *
 * @param {Object} observer
 */
Game.prototype.registerObserver = function(observer) { 
    this.observers.push(observer);

    // If the observer is a player, register the object in "players" as well
    if (observer instanceof Player) {
        this.players.push(observer);
    }
};

/**
 * Remove an object as an observer to the game.
 *
 * @param {Object} socket - a socket that is used to identify the object that is to be removed
 */
Game.prototype.removeObserver = function(socket) {
    this.observers = this.observers.filter(function(o) { return o.getSocket() !== socket; });

    // Remove the reference from the 'players' array as well
    this.players = this.players.filter(function(p) { return p.getSocket() !== socket; });
};

/**
 * Notify all observers of a change in the game state.
 */
Game.prototype.notify = function() {

    // Inform the observers of the changed state
    var state = _.merge({
            gameId: this.getId()
        }, this.state);

    this.observers.forEach(function(o) { o.update(state); });
};

/**
 * Trigger a game event, 'manually'.
 *
 * @param {Object} event - on the format {type: <event type>, ...}
 */
Game.prototype.triggerEvent = function(event) {
    
    // TODO: Should the events handle themself?!
    // TODO: Should this handle all events even disconnect and error?

    switch(event.type) {    
        default:

            // TODO: Events on socket instead?
            this.gameRules.eventHandler(event, this);
    }
};

/**
 * Setting up socket event handlers.
 *
 * @param {Object} socket - socket which is to be set up
 */
Game.prototype.socketSetup = function(socket) {

    // TODO: Rethink this, the event handling setup

    var _this = this; // TODO: Change to bind

    // Handling of socket events that are on a general level:

    // A client has disconnected
    socket.on('disconnect', this.disconnectHandler.bind(this, socket));

    // Needed for socket.io
    socket.on('error', function(data) { console.log(data); });

    // All 'msg' events are handled by the Rules-object
    socket.on('msg', function(data) {
        _this.gameRules.eventHandler(JSON.parse(data), _this, socket); 
    });
};

/**
 * Actions to do when a socket is disconnected.
 *
 * @param {Object} socket - socket that is disconnected
 */
Game.prototype.disconnectHandler = function(socket) {
    this.removeObserver(socket);
    this.gameRules.eventHandler({type: 'disconnect'}, this, socket);
    this.notify();
};

// Idea: Have a fixed update interval to minimize sends to observers, bunch together things

module.exports = Game;