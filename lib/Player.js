/**
 * A module for creating Player objects
 */

// External modules
var _ = require('lodash');
var util = require('util');

// Internal modules
var Observer = require('./Observer');

/**
 * Player constructor function.
 *
 * @param {Object} socket - socket that is to be associated with the created Player object
 */
function Player(socket) {

    // First calls super constructor
    Observer.call(this, socket);

    // The state is a placeholder for a game Rule-objects to put player specifics
    this.state = {}; 
}

// Player inherits from Observer
util.inherits(Player, Observer);

/**
 * Get a player's state property.
 *
 * @return {Object} state - state of the player
 */
Player.prototype.getState = function() { 
    return this.state; 
};

/**
 * Set a player's state property.
 *
 * @param {Object} object - state or part of state that shall be updated
 */
Player.prototype.setState = function(object) { 
    _.merge(this.state, object);
};

/**
 * Sends a state to the client connected to the socket that is
 * associated with the Player object.
 * Overrides update() in Observer, adds the player's state to 
 * the state that is sent to client.
 *
 * @param {Object} state - game state
 */
Player.prototype.update = function(state) {
    this.socket.emit('state', _.merge({player: this.state}, state));
};

module.exports = Player;