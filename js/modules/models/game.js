/**
 * @author Kate Compton
 */

// Organize the game
// Singleton pattern from here: http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript

define(['modules/views/work_view', 'modules/controllers/work_controller', 'modules/views/css_helper', 'modules/views/fopapiOverview'], function(workView, workController, cssHelper, FopapiOverview) {
    var game = {};

    var startGame = function() {
    	cssHelper.init();

		workView.init();
        fopapiGame.workView = workView;
        
        console.log("START GAME");

        // Give the game controller access to the work view so that it
        //  can find objects by screen position
        console.log(workController);
        workController.init(workView);
        
        FopapiOverview.init();

        fopapiGame.ready = true;
    };
    

    return {
        startGame : startGame,
    };

});
