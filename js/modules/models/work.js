/**
 * @author Kate Compton
 */

// Its the World!

define(["modules/models/vector", "kcolor"], function(Vector, KColor) {

    return (function() {

        var camera;

        var toAdd = [];

        function draw(g, options) {
			drawGrid(g, 100);
			
			
	        if(fopapiGame.touch){
	        	g.fill(.5, 1, 1, 1);
	        	if(fopapiGame.touch.pressed){
	        		fopapiGame.touch.currentWorkPosition.drawCircle(g, 6);
	        	} else {
	        		fopapiGame.touch.currentWorkPosition.drawCircle(g, 3);
	        	}
	        	
	        }
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
