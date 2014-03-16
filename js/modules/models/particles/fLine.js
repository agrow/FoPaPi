/**
 * @author April Grow
 */

// Its the Universe!

define(["inheritance", "modules/models/vector", "uparticle"], function(Inheritance, Vector, UParticle) {
    return (function() {

        // Make the star class
        //  Extend the star
        var FLine = UParticle.extend({

            init : function() {

                this._super();
                
                this.fLine = true;

				// Used to id the line and create/destroy it
                this.name = "line" + this.idNumber;
                
                // Will likely be a shape
                this.parentShape = undefined;

				// y = mx + b
				this.m = 0;
				this.b = 0;
				this.p = [];
				this.p[0] = new Vector(0,0); // Draw start pt
				this.p[1] = new Vector(0,0); // First point set by user/algorithm
				this.p[2] = new Vector(0,0); // Second point set by user/algorithm
				this.p[3] = new Vector(0,0); // Draw end pt
				
				fopapiGame.liveDesign.addObject(this.name, this);
            },

			setPoint: function(num, vect) {
				if(num < 0 || num > 3 ){
					console.log("ERROR: CANNOT SET POINT ID " + num);
				} else {
					if(vect === undefined){
						console.log("ERROR: CANNOT SET POINT TO UNDEFINED VECTOR");
					} else {
						vect.cloneInto(this.p[num]);
					}
					
				}
				
				/*
				if(num === 1 || num === 2){
					this.p[num].cloneInto(vect);
					
				} else {
					console.log("Warning: trying to set point " + num);
				}*/
			},
			
			// Just set new points. figure out where the edges should go
			calcEdgePoints: function(){
				if(this.p[2].x - this.p[1].x === 0){
					utilities.debugOutput(this);
					console.log("SLOPE ERROR: DIVIDING BY ZERO");
				} else {
					this.m = (this.p[2].y - this.p[1].y)/(this.p[2].x - this.p[1].x);
					this.b = this.p[1].y - this.m * this.p[1].x; // y = mx + b... b = y - mx
					
					// given the right-x, what is the y? 
					//		if > top-y, stop it at top-y.
					//		if < bottom-y, stop it at bottom-y
					// Repeat with left-x
					var x = fopapiGame.workView.dimensions.width/2;
					var y = this.m * x + this.b;
					var vect = new Vector(x, y);
					
					this.restrainInScreen(vect);
					
					/////////////////// Doesn't keep directionality //////////////
					/*
					this.setPoint(3, vect);
					x = -fopapiGame.workView.dimensions.width/2;
					y = this.m * x + this.b;
					vect.setTo(x, y);
					
					this.restrainInScreen(vect);
					this.setPoint(0, vect);
					*/
					////////////////// KEEPS DIRECTIONALITY ///////////////////////
					
					// if this right x is closer to p3 than p0 (ie distance to 0 is > than to 3)
					if(this.p[1].getDistanceTo(vect) > this.p[2].getDistanceTo(vect)){
						// put it in point 3
						this.setPoint(3, vect);
						// Put the other in point 0
						x = -fopapiGame.workView.dimensions.width/2;
						y = this.m * x + this.b;
						vect.setTo(x, y);
						
						this.restrainInScreen(vect);
						this.setPoint(0, vect);
						
					} else {
						// put it in point 0
						this.setPoint(0, vect);
						// Put the other in point 3
						x = -fopapiGame.workView.dimensions.width/2;
						y = this.m * x + this.b;
						vect.setTo(x, y);
						
						this.restrainInScreen(vect);
						this.setPoint(3, vect);
					}
				}
			},
			
			restrainInScreen: function(vect){
				if(vect.x > fopapiGame.workView.dimensions.width/2) vect.x = fopapiGame.workView.dimensions.width/2;
				if(vect.x < -fopapiGame.workView.dimensions.width/2) vect.x = -fopapiGame.workView.dimensions.width/2;
				
				if(vect.y > fopapiGame.workView.dimensions.height/2) {
					vect.x = ((fopapiGame.workView.dimensions.height/2)-this.b)/this.m;
					vect.y = fopapiGame.workView.dimensions.height/2;
				}
				if(vect.y < -fopapiGame.workView.dimensions.height/2) {
					vect.x = ((-fopapiGame.workView.dimensions.height/2)-this.b)/this.m;
					vect.y = -fopapiGame.workView.dimensions.height/2;
				}
				
			},
			
			calcIntersectionInfo : function(){
				this.A = this.p[3].y - this.p[0].y;
				this.B = this.p[0].x - this.p[3].x;
				this.C = this.A*this.p[0].x + this.B*this.p[0].y;
			},
			
			// algorithm from here: http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=geometry2
			// ASSUMES: Both lines have recently (since points have been last changed) had their calcIntersectionInfo() called
			calcIntersectionPoint : function(otherLine){
				var det = this.A*otherLine.B - otherLine.A*this.B;
				if(det === 0){
					console.log("TWO LINES ARE PARALLEL: No intersection");
				} else {
					return new Vector((otherLine.B*this.C - this.B*otherLine.C)/det, (this.A*otherLine.C - otherLine.A*this.C)/det);
				}
			},
            
            draw : function(g){
            	//this._super(g);
            	utilities.debugOutput("drawing " + this.name);
            	
            	this.idColor.fill(g, .8, 1);
                g.noStroke();
            	for(var i = 0; i < this.p.length; i++){
            		this.p[i].drawCircle(g, 3);
            	}
            	
            	this.idColor.stroke(g, .8, 1);
            	this.p[0].drawLineTo(g, this.p[3]);
            },
            
            checkSubdivideCollision: function(vect, wiggle){
            	// Handled in shape
            },
            
            // Note: this wiggle room is not quite "distance to line"
            // But it's some close approximation!
            checkCollision : function(vect, wiggle){
            	this.collisionDetected = false;
            	
            	this.calcIntersectionInfo();
            	var d = Math.abs(this.A*vect.x + this.B*vect.y - this.C)/Math.sqrt(this.A*this.A + this.B*this.B);
            	//console.log("distance? : " + d);
            	
            	if(d < wiggle) {
            		utilities.debugOutput("collided with " + this.name);
            		this.collisionDetected = true;
            		return true;
            	}
            	return false;
            },
            
            projectPointToLine : function(vect){
            	console.log(this.p[0] + ", " + this.p[3] + " vs. " + vect);
            	
            	this.length = this.p[0].getDistanceTo(this.p[3]);
            	// if the length is 0, should never happen, but cannot divide by zero
            	if(this.length === 0) return this.p[0];
            	console.log("vect1: " + vect);
            	console.log(vect);
            	
            	var temp1 = new Vector(0, 0);
            	vect.cloneInto(temp1);
            	temp1.sub(this.p[0]);//.sub(this.p[0]);
            	console.log("temp1: " + temp1);
            	
            	var temp2 = new Vector(0, 0);
            	this.p[0].cloneInto(temp2);
            	temp2.sub(this.p[3]);
            	console.log("temp2: " + temp2);
            	
            	console.log("dot: " + temp1.dot(temp2));
            	
            	// Turns out negative, not sure why. BUMP IT UP!
            	var t = Math.abs((temp1.dot(temp2))/(this.length*this.length));
            	console.log("vect2: " + vect);
            	console.log("Complex geometry says this point is % along the line: " + t);
            	
            	if(t < 0) return this.p[0];
            	else if(t > 1) return this.p[3];
            	
            	var temp3 = new Vector(0, 0);
            	this.p[3].cloneInto(temp3);
            	temp3.sub(this.p[0]);
            	temp3.mult(t);
            	console.log("temp3: " + temp3);
            	
            	var temp4 = new Vector(0, 0);
            	this.p[0].cloneInto(temp4);
            	temp4.add(temp3);
            	
            	//var projection = this.p[0].add(this.p[3].sub(this.p[0]).mult(t));
            	console.log("projection calculated: " + temp4);
            	
            	console.log(this.p[0] + ", " + this.p[3] + " vs. " + vect);
            	return temp4;
            },


            update : function(time) {
                this._super(time);
            },
            
            toString : function(){
            	return "P0: " + this.p[0] + "\nP1: " + this.p[1] + "\nP2: " + this.p[2] + "\nP3: " + this.p[3];
            },
            
        });

        return FLine;
    })();

});
