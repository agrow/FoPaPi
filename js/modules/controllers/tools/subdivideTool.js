/**
 * @author April Grow
 */


define(["modules/models/vector", "kcolor", "modules/controllers/tools/tool", "modules/models/particles/fLine"], function(Vector, KColor, Tool, FLine) {
    return (function() {

        SubdivideTool = Tool.extend({
            initializeTool : function() {
				this.activeLine = false;
            },

            onUp : function(touch) {
            	if(this.activeLine){
            		// We already have a line going. Can we finish it?
            		var selection;
            		$.each(touch.overObjects, function(index, obj) {
            			console.log("Over object " + obj);
            			if(obj.fLine && selection === undefined){
            				console.log("found fLine: " + obj);
            				selection = obj;
            			}
            		});
            		
            		console.log("trying to FINISH new line linked to " + selection);
            		if(selection){
            			// selection is a line. Get the point projected to it
            			var point = selection.projectPointToLine(touch.currentWorkPosition);
            			console.log("projected click " + touch.currentWorkPosition + " to " + point);
            			this.currentLine.setPoint(3, point);
            			this.activeLine = false;
            		}
            		
            	} else {
            		// Try to start a line projected at the closest point on the line
            		var selection;
            		$.each(touch.overObjects, function(index, obj) {
            			//console.log("Over object " + obj);
            			console.log(obj.fLine);
            			
            			if(obj.fLine && selection === undefined){
            				//console.log("found fLine: " + obj);
            				selection = obj;
            			}
            		});
            		
            		//console.log("trying to start new line linked to " + selection);
            		if(selection){
            			// selection is a line. Get the point projected to it
            			this.currentLine = new FLine();
            			var point = selection.projectPointToLine(touch.currentWorkPosition);
            			console.log("projected click " + touch.currentWorkPosition + " to " + point);
            			
            			this.currentLine.setPoint(0, point);
            			this.currentLine.setPoint(3, touch.currentWorkPosition);
            			
            			this.activeLine = true;
            		}
            	}
            },

            onDown : function(touch) {
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
            	
            	if(this.activeLine){
            		utilities.debugOutput("...with active line!");
            		this.currentLine.setPoint(3, touch.currentWorkPosition);
            	}
            	
                //$.each(touch.overObjects, function(index, obj) {
                    //debugTouch.output("Moving " + obj);
                //});
            },

        });

        return SubdivideTool;
    })();

});
