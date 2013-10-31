/**
 * @author Kate Compton
 */

// Organize the game
// Singleton pattern from here: http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript

define(['modules/views/work_view', 'modules/controllers/work_controller'], function(workView, workController) {
    var game = {};

    var startGame = function() {

		workView.init();
        fopapiGame.workView = workView;
        
        console.log("START GAME");

        // Give the game controller access to the work view so that it
        //  can find objects by screen position
        workController.setWorkView(workView);
        workController.init();

        fopapiGame.ready = true;

    };

    return {
        startGame : startGame,
    };

});
