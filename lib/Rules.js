/**
 * Interface for Game rules, to show which methods a
 * game rules object shall implement. Consists of 'pure' 
 * functions, i.e. does not depend on state.
 */
module.exports = {

    // This method is called when a game is created.
    init: function(game){},

    // Method that receives all events from client and game.
    eventHandler: function(event, game, socket){},

    // Returns a description of the specific game type.
    getType: function(){}
};