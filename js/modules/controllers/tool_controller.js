/**
* @author Kate Compton
*/

// Create the way that the game will render on-screen

define(["modules/models/vector", "modules/controllers/tools/subdivideTool"], function(Vector, SubdivideTool) {
    return (function() {
    	
    	var subdivideTool = new SubdivideTool("subdivide");
    	
        //=======================================================
        // Tool Management
        
        fopapiGame.setActiveTool = function(tool) {
            if (fopapiGame.touch.activeTool)
                fopapiGame.touch.activeTool.deactivate();
            fopapiGame.touch.activeTool = tool;
        };

        //=======================================================
        // Initialize the tool controller

        console.log("START TOOL CONTROLLER");

        // Make the touch accessible from anywhere (but use sparingly!)
        var init = function(view) {
        	fopapiGame.setActiveTool(subdivideTool);
        };

        return {
            init : init,

        };
    })();

});



	    