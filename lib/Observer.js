/**
 * Module for creating Observer objects.
 */

/**
 * Observer constructor function.
 *
 * @param {Object} socket - socket that shall be associated with the created observer
 */
function Observer(socket) {
    this.socket = socket;
};


/**
 * Get the socket associated with an observer.
 *
 * @return {Object} socket - socket associated with an observer
 */
Observer.prototype.getSocket = function() { return this.socket; };


/**
 * Sends a state to the client connected to the socket that is
 * associated with the Observer object.
 *
 * @param {Object} state - game state
 */
Observer.prototype.update = function(state) {

    // TODO: Remove Socket.io dependency
    this.socket.emit('state', state);
};

module.exports = Observer;