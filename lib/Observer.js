//***** Observer constructor module *****//

function Observer(socket) {
    this.socket = socket;
};

Observer.prototype.getSocket = function() { return this.socket; };

Observer.prototype.update = function(state) {
    this.socket.emit('state', state); // TODO: Remove Socket.io dependency
};

module.exports = Observer;