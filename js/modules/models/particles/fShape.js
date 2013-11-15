/**
 * @author April Grow
 */


define(["inheritance", "modules/models/vector", "uparticle", "modules/models/particles/fLine"], function(Inheritance, Vector, UParticle, FLine) {
    return (function() {

        var FShape = UParticle.extend({

            init : function() {

                this._super();

                this.name = "shape" + this.idNumber;

				// Used to draw the shape
				this.points = [];
				
				// Used to find collisions with bisecting lines, to redefine shapes
				this.lines = [];
				
				// Child-shapes made of subdivisions of its lines with new lines
				this.shapes = [];
            },

			addPoint: function(vect) {
				this.points.push(new Vector(vect.x, vect.y));
			},
			
			calculateLines : function() {
				this.lines = [];
				if(this.points.length > 1){
					for(var i = 1; i < this.points.length; i++){
						var fLine = new FLine();
						fLine.setPoint(0, this.points[i-1]);
						fLine.setPoint(3, this.points[i]);
						this.lines.push(fLine);
					}
					
					if(this.points.length > 2){
						// And a closing line
						var lastLine = new FLine();
						lastLine.setPoint(0, this.points[this.points.length-1]);
						lastLine.setPoint(3, this.points[0]);
						this.lines.push(lastLine);
					}
				}
			},
			
			findSubdivide: function(fLine){
				// 1. Find the child shape that this line is fully contained within
				//		Check if both endpoints intersect the lines of this shape
				// 2. If there is no child, then this is the shape that must be subdivided
				
				// 3. Find intersection points with this fLine and this.lines
				// 3.5 Determine theortical id number of new points 
				//		(if it subdivides the line of p[4] and p[5] then its id is 4.5)
				// 4. call makeSubDivide
			},
			
			
			makeSubdivide: function(p1, id1, p2, id2){
				// 1. Make two shapes
				// 2. Add points to shape1 until finding p1 or p2's id numbers
				// 3. Once found, add found point to both shapes
				// 4. Continue adding points to shape2 until finding the other point
				// 5. Once found, add found point to both shapes
				//		Shape2 is now finished
				// 6. Contiue adding the rest of the points to shape1
				//		Shape1 is now finished
			},
            
            draw : function(g){
            	//this._super(g);
            	utilities.debugOutput("drawing " + this.name);

                this.idColor.fill(g, 1);
                g.noStroke();
                
            	for(var i = 0; i < this.points.length; i++){
            		utilities.debugOutput("drawing point " + i + " at " + this.points[i]);
            		
            		this.points[i].drawCircle(g, 3);
            	}
            	
            	if(this.collisionDetected) this.idColor.fill(g, .5, -.5);
            	else g.noFill();
            	this.idColor.stroke(g, .5);
            	g.beginShape();
            	for(var i = 0; i < this.points.length; i++){
            		g.vertex(this.points[i].x, this.points[i].y);
            	}
            	g.endShape(g.CLOSE);
            	
            	// Draw all other child-shapes after. Can be a mode where we draw them first?
            	for(var i = 0; i < this.shapes.length; i++){
            		this.shapes[i].draw(g);
            	}
            	
            },


            update : function(time) {
                this._super(time);
            },
            
            checkCollision: function(vect, wiggle){
            	var collided = [];
            	this.collisionDetected = false;
            	
            	if(this.lines.length === 0){
            		console.log("Shape with no lines: can't check collision");
            	} else {
            		for(var i = 0; i < this.lines.length; i++){
	            		if(this.lines[i].checkCollision(vect, wiggle)) {
	            			collided.push(this.lines[i]);
	            			this.collisionDetected = true;
	            		}
	            	}
            	}
            	
            	return collided;
            },
            
            hasChild: function(){
            	if (this.shapes.length > 0) return true;
            	return false;
            },
            
            toString : function(){
            	//return "P0: " + this.p[0] + "\nP1: " + this.p[1] + "\nP2: " + this.p[2] + "\nP3: " + this.p[3];
            },
            
        });

        return FShape;
    })();

});
