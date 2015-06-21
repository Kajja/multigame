//***** Player module, exports a constructor to create players *****//

util = require('util');
Observer = require('./Observer');
_ = require('lodash');

function Player(socket) {

    // First calls super constructor
    Observer.call(this, socket);

    // The state is a placeholder for a game Rule-objects to put player specifics
    this.state = {}; 
};

// Player inherits from Observer
util.inherits(Player, Observer);

Player.prototype.getState = function() { return this.state; };

Player.prototype.setState = function(object) { 
    _.merge(this.state, object);
};

// Overrides update() in Observer, adds the players state to the state that is sent to client
Player.prototype.update = function(state) {
    this.socket.emit('state', _.merge({player: this.state}, state));
};

module.exports = Player;