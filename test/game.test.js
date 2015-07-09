var assert = require('assert');
var Game = require('../lib/Game');
var Rules = require('../lib/Rules');
var Observer = require('../lib/Observer');
var Player = require('../lib/Player');

describe('Game', function() {

    var socket1 = {
        emit: function() {}
    };

    var socket2 = {
        emit: function() {}
    };

    describe('Create game', function() {

        it('should create a game', function() {

            var game = new Game({id: 1, rules: Rules});
            assert(game instanceof Game);
        });

        context('when arguments are missing', function(){

            it('should not create a game without an id or rules', function() {
 
                assert.throws(function() { new Game(); });
            });

            it('should not create a game without rules', function() {

                assert.throws(function() { new Game({id: 1}); });
            });
        });
    });

    describe('Game properties', function(){

        it('should state its id', function() {

            var game = new Game({id: 4, rules: Rules});
            assert.equal(4, game.getId());
        });

        it('should state its name', function() {

            var game = new Game({id: 4, rules: Rules, name: 'My name'});
            assert.equal('My name', game.getName());
        });

        it('should state its type', function() {

            var testRules = {
                init: function() {},
                getType: function() { return 'test';}
            };
            var game = new Game({id: 4, rules: testRules});
            assert.equal('test', game.getType());
        })
    });

    describe('Player handling', function() {

        var player1 = new Player(socket1);
        var player2 = new Player(socket2);
        var game = new Game({id: 1, rules: Rules});

        it('should register players', function() {
 
            var length = game.getPlayers().length;
            game.registerObserver(player1);
            game.registerObserver(player2);
            assert(game.getPlayers().length === length + 2);
        });

        it('should return all the players that are registered', function() {
 
            var players = game.getPlayers();

            assert.equal(player1, players[0]);
            assert.equal(player2, players[1]);
        });

        it('should return a specific player', function(){
 
            assert.equal(player2, game.getPlayer(socket2));
        });

        it('should remove a player', function() {
 
            var length = game.getPlayers().length;
            game.removeObserver(socket1);
            assert.equal(length - 1, game.getPlayers().length);
            assert.equal(player2, game.getPlayers()[0]);
        });

        it('should remove all players', function() {

            game.removeObserver(socket2);
            assert.equal(0, game.getPlayers().length);
        });

    });
    
    describe('State handling', function() {

        var game;

        beforeEach(function() {
            game = new Game({id:1, rules: Rules});            
        });

        it('should accept a state', function(){

            game.setState({test: 'test', prop: 'ok'});
            assert.deepEqual({test: 'test', prop: 'ok'}, game.getState());
        });

        it('should merge input with existing state', function(){
 
            game.setState({test: 'test', score: 10});
            game.setState({score: 11, res: 'ok'});
            assert.deepEqual({test: 'test', score: 11, res: 'ok'}, game.getState());
        });
    });

    context('when a notify event has been triggered', function(){

        var observer1 = {update: function(state){ this.state = state; }};
        var observer2 = {update: function(state){ this.state = state; }};
        var game = new Game({id: 1, rules: Rules});
        game.registerObserver(observer1);
        game.registerObserver(observer2);      

        game.setState({test: 'test'});
        game.notify();

        it('should send, to observers, its id and state', function(){
 
            assert.deepEqual({gameId: 1, test: 'test'}, observer1.state);
        });

        it('should update all observers', function(){    
 
            assert(observer1.state == observer2.state);
        });
    });

    context('when an event has been triggered', function() {

        var testRules = {
            init: function() {},
            eventHandler: function(event, game) { 
                this.event = event;
                this.game = game;
            },
            getType: function() { return 'test';}
        };
        var game = new Game({id: 1, rules: testRules});
        var event = {type: 'testEvent'}; 
        game.triggerEvent(event);

        it('should pass the event to the Rules object', function() {

            assert.equal(event, testRules.event);
        });

        it('should pass a reference to the game to the Rules object', function() {
 
            assert.equal(game, testRules.game);
        });
    });

    context('when there is a new socket connection', function() {

        var testRules = {
            init: function() {},
            eventHandler: function(event, game) { 
                this.event = event;
                this.game = game;
            },
            getType: function() { return 'test';}
        };
        var socket = {
                handlers: {},
                on: function(event, handler) {
                    this.handlers[event] = handler;
            }
        };

        var game = new Game({id: 1, rules: testRules});

        it('should set up socket event handlers', function() {

            game.socketSetup(socket);

            assert.equal('function', typeof socket.handlers['disconnect']);
            assert.equal('function', typeof socket.handlers['error']);
            assert.equal('function', typeof socket.handlers['msg']);
        });
    });

    context('when an observer disconnects', function() {

        var testRules = {
            init: function() {},
            eventHandler: function(event, game, socket) { 
                this.event = event;
                this.game = game;
                this.socket = socket;
            },
            getType: function() { return 'test';}
        };

        var observer1 = new Observer(socket1);
        observer1.update = function() {this.test = true;};
        var observer2 = new Observer(socket2);
        observer2.update = function() {this.test = true;};
        var game = new Game({id: 1, rules: testRules});
        
        game.registerObserver(observer1);
        game.registerObserver(observer2);

        game.disconnectHandler(socket2);

        it('should remove the observer from the list of observers', function() {

            assert(game.observers.indexOf(observer2) === -1);
        });

        it('should pass the event to the Rules object', function() {
 
            assert.deepEqual({type: 'disconnect'}, testRules.event);
        });

        it('should pass the socket to the Rules object', function() {

            assert.equal(socket2, testRules.socket);
        });        

        it('should notify all remaining observers', function() {

            assert(observer1.test);
            assert(!observer2.test);
        });
    })
});