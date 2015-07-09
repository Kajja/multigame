var assert = require('assert');
var Observer = require('../lib/Observer');

var socket = {
        emit: function(eventType, data) {
            this.event = eventType;
            this.data = data;
        }
};

describe('Observer', function(){

    context('when creating an Observer', function() {

        context('missing socket', function() {

            //it('should throw an error')
        });

        context('with socket', function() {

            it('should create a new Observer', function() {
 
                var observer = new Observer(socket);
                assert(observer instanceof Observer);
            });
        });
    });

    it('should return the socket when asked for', function() {

        var observer = new Observer(socket); 
        assert.equal(socket, observer.getSocket());
    });

    context('when the Observer instance receives a state update', function() {

        var observer = new Observer(socket);
        var state = {test: 'test'};
        observer.update(state);

        it('should send a "state" event and the state on the socket', function() {
      
            assert.equal('state', socket.event);
            assert.equal(state, socket.data);
        });
    });
});