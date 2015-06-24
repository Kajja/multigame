/**
 * Game manager module.
 * Manages all games on the server. Singleton.
 */

/**
 * Manager constructor function, implemented in a closure,
 * that creates objects with methods that can be used 
 * to manage games.
 */ 
var ManagerModule = (function() {

    var games = [];

    /**
     * Constructor function.
     */
    function Manager() {
        
    };

    /**
     * Method to register a game with the manager.
     *
     * @param game that is to be registred
     * @throws Error if no game object is supplied
     * @return true if everything went well
     */
    Manager.prototype.registerGame = function(game) {

        // TODO: Verify game in some other way?
        if (!game) throw new Error('You must supply a Game object when registering a game');

        games.push(game);
        return true;
    };

    /**
     * Removes a game from the manager.
     *
     * @param game to be removed
     */
    Manager.prototype.removeGame = function(game) {

        // Filter out all games that are not equal the value of the game parameter
        games = games.filter(function(g) { return g !== game; });
    };

    /**
     * Get all games.
     *
     * @return array with all the games registred with the manager
     */
    Manager.prototype.getGames = function() {
        return games;
    };

    /**
     * Get a specific game.
     *
     * @param id of the game to fetch
     * @return null or the game object with the specified id
     */
    Manager.prototype.getGame = function(id) {

        var game = games.filter(function(g) {

            // (Type conversion if id is a string)
            return g.getId() == id; 
        });
        return game.length === 0 ? null : game[0];
    };

    return Manager;
})();

module.exports = new ManagerModule();