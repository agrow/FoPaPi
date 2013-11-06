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

                this.name = "line" + this.idNumber;

				// y = mx + b
				this.m = 0;
				this.b = 0;
				this.p = [];
				this.p[0] = new Vector(0,0); // Edge of the screen. COMPUTED, NOT SET
				this.p[1] = new Vector(0,0); // First point set by user/algorithm
				this.p[2] = new Vector(0,0); // Second point set by user/algorithm
				this.p[3] = new Vector(0,0); // Edge of the screen. COMPUTED, NOT SET
            },

			setPoint: function(num, vect) {
				if(num < 0 || num > 3 ){
					console.log("ERROR: CANNOT SET POINT ID " + num);
				} else {
					if(vect === undefined){
						console.log("ERROR: CANNOT SET POINT TO UNDEFINED VECTOR");
					} else {
						this.p[num].cloneInto(vect);
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
					console.log("SLOPE ERROR: DIVIDING BY ZERO");
				} else {
					this.m = (this.p[2].y - this.p[1].y)/(this.p[2].x - this.p[1].x);
					this.b = this.p[1].y - this.m * this.p[1].x; // y = mx + b... b = y - mx
					
					// given the right-x, what is the y? 
					//		if > top-y, stop it at top-y.
					//		if < bottom-y, stop it at bottom-y
					// Repeat with left-x
					var x = fopapiGame.view.dimensions.width/2;
					var y = this.m * x + this.b;
					var vect = new Vector(x, y);
					
					this.restrainInScreen(vect);
					
					////////////////// KEEPS DIRECTIONALITY ///////////////////////
					// if this right x is closer to p3 than p0 (ie distance to 0 is > than to 3)
					if(this.p[1].getDistanceTo(vect) > this.p[2].getDistanceTo(vect)){
						// put it in point 3
						this.setPoint(3, vect);
						// Put the other in point 0
						x = -fopapiGame.view.dimensions.width/2;
						y = this.m * x + this.b;
						vect.setTo(x, y);
						
						this.restrainInScreen(vect);
						this.setPoint(0, vect);
						
					} else {
						// put it in point 0
						this.setPoint(0, vect);
						// Put the other in point 3
						x = -fopapiGame.view.dimensions.width/2;
						y = this.m * x + this.b;
						vect.setTo(x, y);
						
						this.restrainInScreen(vect);
						this.setPoint(3, vect);
					}
				}
			},
			
			restrainInScreen: function(vect){
				if(vect.x > fopapiGame.view.dimensions.width/2) vect.x = fopapiGame.view.dimensions.width/2;
				if(vect.x < -fopapiGame.view.dimensions.width/2) vect.x = -fopapiGame.view.dimensions.width/2;
				
				if(vect.y > fopapiGame.view.dimensions.height/2) vect.y = fopapiGame.view.dimensions.height/2;
				if(vect.y < -fopapiGame.view.dimensions.height/2) vect.y = -fopapiGame.view.dimensions.height/2;
				
			},

            drawMain : function(context) {
                this._super(context);

                var g = context.g;
                
            },


            update : function(time) {
                this._super(time);
            }
        });

        return FLine;
    })();

});
