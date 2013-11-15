/**
 * @author April Grow
 */


define(["modules/models/vector", "kcolor", "modules/controllers/tools/tool"], function(Vector, KColor, Tool) {
    return (function() {

        SubdivideTool = Tool.extend({
            initializeTool : function() {

            },

            onUp : function(touch) {
				// Place second point and iron out subdivision extension
            },

            onDown : function(touch) {
				// Place first point
            },

            onDrag : function(touch) {
                var tool = this;
                var target = undefined;

				utilities.debugOutput("dragin' in subdivide...");
                $.each(touch.overObjects, function(index, obj) {
                    //debugTouch.output("Dragging " + obj);
                });
                
                // Estimate subdivision
            },
            
            // Should only do hover actions
            onMove : function(touch) {
            	utilities.debugOutput("movin' in subdivide...");
            	
                $.each(touch.overObjects, function(index, obj) {
                    //debugTouch.output("Moving " + obj);
                });
            },

        });

        return SubdivideTool;
    })();

});
