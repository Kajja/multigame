/**
 * Module for creating Observer objects.
 */

/**
 * Observer constructor function.
 *
 * @param socket that shall be associated with the created observer
 */
function Observer(socket) {
    this.socket = socket;
};


/**
 * Get the socket associated with an observer.
 *
 * @return socket associated with an observer
 */
Observer.prototype.getSocket = function() { return this.socket; };


/**
 * Sends a state to the client connected to the socket that is
 * associated with the Observer object.
 *
 * @param game state
 */
Observer.prototype.update = function(state) {

    // TODO: Remove Socket.io dependency
    this.socket.emit('state', state);
};

module.exports = Observer;