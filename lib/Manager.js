//***** Singleton that manages all games *****//

var ManagerModule = (function() {

    var games = [];

    function Manager() {
        
    };

    Manager.prototype.registerGame = function(game) {

        // Verify game in some other way?
        if (!game) throw new Error('You must supply a Game object when registering a game');

        games.push(game);
        return true;
    };

    Manager.prototype.removeGame = function(game) {

        // Filter out all games that are not equal the value of the game parameter
        games = games.filter(function(g) { return g !== game; });
    };

    Manager.prototype.getGames = function() {
        return games;
    };

    Manager.prototype.getGame = function(id) {

        var game = games.filter(function(g) {
            return g.getId() == id; // Type conversion if id is a string
        });
        return game.length === 0 ? null : game[0];
    };

    return Manager;
})();

module.exports = new ManagerModule();