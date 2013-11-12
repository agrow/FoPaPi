/**
 * @author Kate Compton
 */

// Its the World!

define(["modules/models/vector", "kcolor", "modules/models/fopapiDesign", "modules/models/particles/fShape"], function(Vector, KColor, FopapiDesign) {

    return (function() {

        var camera;
		var imageReady;
        var toAdd = [];
        

        var design;

        function draw(g, options) {
        	g.noStroke();
			drawGrid(g, 100);
			
	        drawImage(g);
	        
	        design.draw(g, options);
			
			// Touch should draw last since it should be above everything
	        if(fopapiGame.touch){
	        	g.noStroke();
	        	g.fill(.5, 1, 1, 1);
	        	if(fopapiGame.touch.pressed){
	        		fopapiGame.touch.currentWorkPosition.drawCircle(g, 6);
	        		
	        	} else {
	        		fopapiGame.touch.currentWorkPosition.drawCircle(g, 3);
	        	}
	        }
	        
	        
        };
        
        function drawImage(g){
        	//utilities.debugOutput("Trying to draw image...");
        	
        	if(imageReady){
	        	console.log("Work detected ready image");
	        	// this.imageReady is set by fopapiProject once the file is loaded
	        	// NOTE: raw image data from e.target.result works
	        	this.pimage = g.loadImage(imageReady);
	        	imageReady = undefined;
	        	this.resized = false;
	        }
	        
	        // It takes a cycle or two for the dimensions to be calculated, so we have to try a couple of times.
	        if(this.resized === false){
	        	attemptResize();
	        }
	        
	        if(this.pimage){
	        	g.image(this.pimage, -this.pimage.width/2, -this.pimage.height/2);
	        }
        };
        
        //
        function attemptResize(){
        	// It takes a cycle or two for the dimensions to be calculated
        	if(this.pimage.width > 0){
	        	// Try to resize the image for the workspace
	        	if(this.pimage.width > fopapiGame.workView.dimensions.width){
	        		console.log("Making a bit skinnier... " + this.pimage.width + " > " + fopapiGame.workView.dimensions.width);
	        		this.pimage.resize(fopapiGame.workView.dimensions.width-10, 0);
	        		//Is it still too tall?
	        		if(this.pimage.height > fopapiGame.workView.dimensions.height){
	        			console.log("Making a bit shorter..." + this.pimage.height + " > " + fopapiGame.workView.dimensions.height);
	        			this.pimage.resize(0, fopapiGame.workView.dimensions.height-10);
	        		}
	        	}
	        	// Blow up the image a bit to make it easier to work with
	        	if(this.pimage.width < 100){
	        		console.log("Making a bit wider..." + this.pimage.width + " < " + 100);
	        		this.pimage.resize(300, 0);
	        		// Did I make it too tall accidentally?
	        		if(this.pimage.height > fopapiGame.workView.dimensions.height){
	        			console.log("Making a bit shorter..." + this.pimage.height + " > " + fopapiGame.workView.dimensions.height);
	        			this.pimage.resize(0, fopapiGame.workView.dimensions.height-10);
	        		}
	        		
	        	}
	        	if(this.pimage.height < 100){
	        		console.log("Making a bit taller..." + this.pimage.height + " < " + 100);
	        		this.pimage.resize(0, 400);
	        		// Did I make it too wide accidentally?
	        		if(this.pimage.width > fopapiGame.workView.dimensions.width){
		        		console.log("Making a bit skinnier... " + this.pimage.width + " > " + fopapiGame.workView.dimensions.width);
		        		this.pimage.resize(fopapiGame.workView.dimensions.width-10, 0);
		        	}
	        		
	        	} 
	        	this.resized = true;
        	} else {
        		this.resized = false;
        	}
        };

      
        function drawGrid(g, spacing){
        	utilities.debugOutput("Drawing grid");
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
        		g.noStroke();
        		g.fill(.4, .5, 1, 1);
        		this.gridPoints[k].drawCircle(g, 3);
        	}
        };

        function spawn(object) {
            toAdd.push(object);
        };

        function update(time) {
            fopapiGame.time.worldTime = time.total;
			design.update(time);

            if(fopapiGame.touch){
	        	if(fopapiGame.touch.pressed){
		           utilities.debugOutput("MD (update) at " + fopapiGame.touch.currentWorkPosition);
	            }
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
            
            design = new FopapiDesign();
        };
        
        function getCamera() {
            console.log(camera);
            return camera;
        };
        
        function getDesign() {
            return design;
        };

		function setImageReady(img){
			imageReady = img;
		};

        return {
            draw : draw,
            update : update,
            getCamera : getCamera,
            init : init,
            setImageReady : setImageReady,
            getDesign : getDesign,
        };

    })();

});
