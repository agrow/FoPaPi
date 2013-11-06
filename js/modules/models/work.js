/**
 * @author Kate Compton
 */

// Its the World!

define(["modules/models/vector", "kcolor", "modules/models/particles/fLine"], function(Vector, KColor, FLine) {

    return (function() {

        var camera;

        var toAdd = [];
        
        var testLine = new FLine();
        var testClick = false;

        function draw(g, options) {
        	g.noStroke();
			drawGrid(g, 100);
			
			
	        if(fopapiGame.touch){
	        	g.fill(.5, 1, 1, 1);
	        	if(fopapiGame.touch.pressed){
	        		fopapiGame.touch.currentWorkPosition.drawCircle(g, 6);
	        		//console.log(fopapiGame.touch.currentWorkPosition);
	        		utilities.debugOutput("Mouse down at " + fopapiGame.touch.currentWorkPosition);
	        		
	        	} else {
	        		fopapiGame.touch.currentWorkPosition.drawCircle(g, 3);
	        	}
	        }
	        
	        testLine.draw(g, options);
        }
        
        function drawGrid(g, spacing){
        	// Make the grid if it hasn't been made
        	if(!this.gridPoints){
        		console.log("Making gridPoints " + spacing);
        		
        		this.gridPoints = [];
        		for(var i = -1000; i<1000; i+= spacing){
        			for(var j = -1000; j<1000; j+= spacing){
        				this.gridPoints.push(new Vector(i, j));
        			}
        		}
        	}
        	
        	for(var k = 0; k < this.gridPoints.length; k++){
        		g.fill(.4, .5, 1, 1);
        		this.gridPoints[k].drawCircle(g, 3);
        	}
        }

        function spawn(object) {
            toAdd.push(object);
        }

        function update(time) {
            fopapiGame.time.worldTime = time.total;
            if(fopapiGame.touch){
	        	if(fopapiGame.touch.pressed){
		           utilities.debugOutput("MD (update) at " + fopapiGame.touch.currentWorkPosition);
	            }
            }
            
			if(fopapiGame.touch){
	        	if(fopapiGame.touch.pressed){
	        		if(testClick === false){
	        			// click something!
	        			console.log("Clicking at " + fopapiGame.touch.currentWorkPosition);
	        			testLine.setPoint(1, fopapiGame.touch.currentWorkPosition);
	        			testClick = true;
	        			console.log("SETTING POINT CLICKING line: \n" + testLine);
	        			 
	        		}
	        	} else {
	        		testClick = false;
	        	}
	        	
	        	testLine.setPoint(2, fopapiGame.touch.currentWorkPosition);
	        	testLine.calcEdgePoints();
	        }
        };

        function init() {
            console.log("INIT WORK");

            camera = {
                angle : new Vector(0, 0, 0),
                center : new Vector(0, 0, 0),
                zoom : 1,
                scrollingMovement : new Vector(20, 0, 0),

            };

        };
        
        function getCamera() {
            console.log(camera);
            return camera;
        }


        return {
            draw : draw,
            update : update,
            getCamera : getCamera,
            init : init,
        };

    })();

});
