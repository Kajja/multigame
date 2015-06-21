
var assert = require('assert');
var Game = require('../lib/Game');
var Rules = require('../lib/Rules');
var Player = require('../lib/Player');

describe('Game', function() {

    //Stubs
    var socket1 = {
        emit: function() {}
    };

    var socket2 = {
        emit: function() {}
    };

    describe('Create game', function() {

        it('should not create a game without an id', function() {
            assert.throws(function() { new Game(); });
        });

        it('should not create a game without rules', function() {
            assert.throws(function() { new Game({id: 1}); });
        });

        it('should state its id', function() {
            var game = new Game({id: 4, rules: Rules});
            assert.equal(4, game.getId());
        });
    });

    describe('Players', function() {

        var player1 = new Player(socket1);
        var player2 = new Player(socket2);
        var game = new Game({id: 1, rules: Rules});

        game.registerObserver(player1);
        game.registerObserver(player2);

        it('should return the players that are connected to the game', function() {
            assert.equal(player1, game.getPlayers()[0]);
            assert.equal(player2, game.getPlayers()[1]);
        });

        it('should be possible to remove a player', function() {
            var length = game.getPlayers().length;
            game.removeObserver(socket1);
            assert.equal(length - 1, game.getPlayers().length);
            assert.equal(player2, game.getPlayers()[0]);
        });

        it('should be possible to remove all players', function() {
            game.removeObserver(socket2);
            assert.equal(0, game.getPlayers().length);
        });

        it('should be possible to add a player again', function() {
            game.registerObserver(player1);
            assert.equal(player1, game.getPlayers()[0]);
            assert.equal(1, game.getPlayers().length);
        });

    });
});