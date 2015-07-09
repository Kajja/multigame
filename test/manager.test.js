var Manager = require('../lib/Manager');
var Game = require('../lib/Game');
var assert = require('assert');

var testRules = {init: function(){}};
var game = new Game({id: 23, rules: testRules});
var game2 = new Game({id: 24, rules: testRules});

describe('Manager', function(){

    context('when a game is to be registred' , function() {

        //it('should not allow games with identical ids')

    });

    context('when a game has been registered', function() {

        Manager.registerGame(game);

        it('should retreive the game by its id', function() {

            assert.equal(game, Manager.getGame(23));
        });

    });

    context('when multiple games are registered', function() {

        Manager.registerGame(game2);

        it('should return all registered games', function() {

            var games = Manager.getGames();
            assert.equal(2, games.length);
            assert.equal(game2, games[1]);
        });
    });


    context('when a game is removed', function() {

        before(function() {
            Manager.removeGame(game);            
        });

        after(function() {
            Manager.registerGame(game);
        });

        it('should have removed the game from the list of games', function() {
 
            assert(Manager.getGames().indexOf(game) === -1);
            assert(!Manager.getGame(23));
        });

        it('should not have affected other games', function() {

            assert(Manager.getGames().indexOf(game2) !== -1);
        });
    });

});