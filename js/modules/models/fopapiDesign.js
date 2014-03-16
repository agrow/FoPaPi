/**
 * @author April Grow
 */

define(["inheritance", "modules/models/vector", "modules/models/particles/fShape"], function(Inheritance, Vector, FShape) {
    return (function() {

        var FopapiDesign = Class.extend({
            init : function() {
            	this.testClick = false;
            	fopapiGame.liveDesign = this;
            	
                this.objects = [];
                this.objectIDs = [];
                
                this.initFirstShape();
            },
            
            initFirstShape : function() {
            	this.firstShape = new FShape();
            	var adj = 1;
            	
            	this.firstShape.addPoint(new Vector(-fopapiGame.workViewDimensions.width/2 +adj, -fopapiGame.workViewDimensions.height/2 +adj));
            	this.firstShape.addPoint(new Vector(fopapiGame.workViewDimensions.width/2 -adj, -fopapiGame.workViewDimensions.height/2 +adj));
            	this.firstShape.addPoint(new Vector(fopapiGame.workViewDimensions.width/2 -adj, fopapiGame.workViewDimensions.height/2 -adj));
            	this.firstShape.addPoint(new Vector(-fopapiGame.workViewDimensions.width/2 +adj, fopapiGame.workViewDimensions.height/2 -adj));
            	
            	this.firstShape.calculateLines();
            	
            	// New shapes are automatically added to this now
            	//this.addObject(this.firstShape.name, this.firstShape);
            	
            	/*
            	var testShape = new FShape();
            	testShape.addPoint(new Vector(-5, -5));
            	testShape.addPoint(new Vector(5, -5));
            	testShape.addPoint(new Vector(5, 5));
            	testShape.addPoint(new Vector(-5, 5));
            	testShape.calculateLines();
            	this.addObject(testShape.name, testShape);
            	*/
            },
            
            update : function(time) {
            	for(var i = 0; i < this.objects.length; i++){
            		this.objects[i].update(time);
            	}
            	
            	/*
				if(fopapiGame.touch){
		        	if(fopapiGame.touch.pressed){
		        		if(this.testClick === false){
		        			// click something!
		        			console.log("FD: Test clicking at: " + fopapiGame.touch.currentWorkPosition);
		        			console.log("FD tool: " + fopapiGame.touch.activeTool);
		        			//testShape.addPoint(fopapiGame.touch.currentWorkPosition);
		        			//testShape.calculateLines();
		        			this.testClick = true;
		        			 
		        		}
		        	} else {
		        		this.testClick = false;
		        	}
		        	
		        	//testLine.setPoint(2, fopapiGame.touch.currentWorkPosition);
		        	//testLine.calcEdgePoints();
		        }*/
            },
            
            checkCollision : function(vect, wiggle){
            	var collided = [];
            	for (var i = 0; i < this.objects.length; i++){
            		if(this.objects[i].checkCollision(vect, wiggle)) collided.push(this.objects[i]);
            	}
            	return collided; //this.firstShape.checkCollision(vect, wiggle);
            },
            
            draw : function(g, options){
            	for(var i = 0; i < this.objects.length; i++){
            		this.objects[i].draw(g, options);
            	}
            },

            addObject : function(name, obj) {
            	this.objects.push(obj);
            	this.objectIDs[name] = this.objects.length -1;
            },
            
            removeObject : function(name){
            	this.objects.splice(this.objectIDs[name], 1);
            	this.objectIDs[name] = undefined;
            }

        });
        return FopapiDesign;
    })();

});