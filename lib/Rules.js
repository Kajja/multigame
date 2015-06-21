//***** Interface for Game rules *****//
// Consisting of 'pure' functions, i.e. does not depend on state

module.exports = {
    init: function(game){},                       // This method is called when a game is created
    getType: function(){},                        // Returns a string
    eventHandler: function(event, game, socket){} // 
};