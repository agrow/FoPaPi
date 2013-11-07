/**
 * @author April Grow
 */

define(['modules/models/fopapiProject'], function(FopapiProject) {
	console.log("OVERVIEW STARTED");
	
    var init = function() {
    	console.log("INIT OVERVIEW");
    	
    	fopapiGame.liveProject = new FopapiProject();
		fopapiGame.overview = this;
		
		setupControlUI();
    };

	var setupControlUI = function() {
		//fopapiGame.cssHelper.makeButton("control_panel", "Load Image", fopapiGame.liveProject.promptLoadImage);
		fopapiGame.cssHelper.makeFileUpload("control_panel", 
											function(evt){
												var fileName = $(this).val();
												fopapiGame.liveProject.loadImage(evt.target)
											});
	};

	var update = function(){
		
	};

    return {
        init : init,
        update : update,
    };

});
