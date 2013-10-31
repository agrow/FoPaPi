/**
 * @author Kate Compton
 */

// Organize the game
// Singleton pattern from here: http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript

define(['modules/models/world'], function(world) {
    var game = {};

    var startGame = function() {
        // Make this into a global object

        world.init();
        fopapiGame.world = world;

        console.log("START GAME");
		
        fopapiGame.ready = true;

    };

    return {
        startGame : startGame,
    };

});
