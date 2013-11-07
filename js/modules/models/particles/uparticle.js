/**
 * @author Kate Compton
 */

// Its the WorldParticle!!

define(["inheritance", "modules/models/vector", "noise", "kcolor"], function(Inheritance, Vector, Noise, KColor) {
    return (function() {

        var noise = new Noise();

        // Private functions
        var particleCount = 0;

        // Make the star class
        var UParticle = Class.extend({
            init : function() {
                this.idNumber = particleCount;
                particleCount++;
                this.idColor = new KColor((this.idNumber * .289 + .31) % 1, 1, 1);

                this.setRadius(5);

                this.position.setToPolar(Math.random() * 200 + 100, Math.random() * 100);

                this.initAsTouchable();
                this.debugOutputLines = [];

				this.lifespans = [];
            },

            setRadius : function(r) {
                this.radius = r;
            },

            remove : function() {
                this.deleted = true;
            },

            debugOutput : function(d) {

                this.debugOutputLines.push(d);

            },
            clearDebugOutput : function() {
                this.debugOutputLines = [];
            },

            // Update this particle according to physics
            update : function(time) {
                // Clear the output
                var t = time.ellapsed;
                if (this.lastUpdate === undefined) {
                    this.lastUpdate = 0;
                }

                this.clearDebugOutput();

                //DEBUG CHECKING
                if(this.DEBUGPOSITION){
                	utilities.debugOutput(this.idNumber + "pos: " + this.position);
                }

				//utilities.debugOutput(this.idNumber + " lifespans.length: " + this.lifespans.length);
                for(var i = 0; i < this.lifespans.length; i++){
                	this.lifespans[i].update();
                }
            },

            initAsTouchable : function() {
                this.touchable = true;
                this.touchHeld = false;
            },

            touchStart : function(touch) {
                this.touchHeld = true;
            },
            touchEnd : function(touch) {
                this.touchHeld = false;
            },

            drawBackground : function(g, options) {

            },

            drawMain : function(g, options) {

                this.idColor.fill(g);
                g.noStroke();
                if (this.deleted) {
                    g.fill(.2, 0, .4);
                    g.stroke(1, 0, 1, .7);
                }

                g.ellipse(0, 0, this.radius, this.radius);

            },
            drawOverlay : function(g, options) {


                // Draw the text
                this.idColor.fill(g);
                this.idColor.stroke(g, 1, 1);
                var textX = this.radius * .85 + 5;
                var textY = this.radius * .74 + 5;
                g.text(this.idNumber, textX, textY);
                $.each(this.debugOutputLines, function(index, line) {
                    g.text(line, textX, textY + 12 * (index + 1));
                })
            },
            draw : function(g, options) {

                switch(options.layer) {
                    case "bg":
                        this.drawBackground(g, options);
                        break;

                    case "main":
                        this.drawMain(g, options);

                        break;

                    case "overlay":
                        this.drawOverlay(g, options);
                        break;

                }
            },
            toString : function() {
                return "p" + this.idNumber + this.position;
            },
        });
        return UParticle;
    })();

});
