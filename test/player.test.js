var assert = require('assert');
var Player = require('../lib/Player');
var Observer = require('../lib/Observer');

var socket = {
        emit: function(eventType, data) {
            this.event = eventType;
            this.data = data;
        }
};

describe('Player', function(){

    context('when a Player is created ', function() {

        var player = new Player(socket);

        it('should inherit from Observer', function() {

            assert(player instanceof Observer);
        });
    });

    describe('State handling', function() {

        var player;

        beforeEach(function() {
            player  = new Player(socket);
        });

        it('should accept a state', function(){
 
            player.setState({test: 'test', prop: 'ok'});
            assert.deepEqual({test: 'test', prop: 'ok'}, player.getState());
        });

        it('should merge input with existing state', function(){
 
            player.setState({test: 'test', score: 10});
            player.setState({score: 11, res: 'ok'});
            assert.deepEqual({test: 'test', score: 11, res: 'ok'}, player.getState());
        });
    });

    context('when the Player instance receives a state update', function() {

        var player = new Player(socket);
        var state = {test: 'test'};

        player.setState({player: true});
        player.update(state);

        it('should send a "state" event on the socket', function() {

            assert.equal('state', socket.event);
        });

        it('should add its own state to the game state sent', function() {

            assert.deepEqual({player: {player:true}, test: 'test'}, socket.data);
        });
    });
});