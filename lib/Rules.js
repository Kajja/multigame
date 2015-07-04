/**
 * Interface for Game rules, to show which methods a
 * game rules object shall implement. Consists of 'pure' 
 * functions, i.e. does not depend on state.
 */
module.exports = {

    /**
     * This method initiates a game according to the specific type of game
     * to be created.
     *
     * @param {Object} game - game to be initiated
     */
    init: function(game){},

    /**
     * Method that receives all events from client and game.
     *
     * @param {Object} event
     * @param {Object} game - game associated with the event
     * @param {Object} socket - socket associated with the event
     */
    eventHandler: function(event, game, socket){},
 
    /**
     * Returns a description of the specific game type.
     *
     * @return {String} description - game type description
     */
    getType: function(){}
};