/**
 * @author Kate Compton
 */

// Display the World
// It's using a singleton pattern
define(["processing", "modules/models/vector"], function(PROCESSING, Vector) {
    console.log("Init world view");

    return (function() {

        var world;

        var processing;

        var activeObjects = [];
        var updateFunctions = [];

        var time = {
            total : 0,
            ellapsed : 0.1,
        };

        var update = function(currentTime) {

            // make sure that the ellapsed time is neither to high nor too low
            time.ellapsed = currentTime - time.total;
            if (time.ellapsed === undefined)
                time.ellapsed = .03;
            utilities.constrain(time.ellapsed, .01, .1);

            time.total = currentTime;
            utilities.debugOutput("Update " + time.total.toFixed(2) + " fps: " + (1 / time.ellapsed).toFixed(2));

        };


        var draw = function(g) {
            utilities.clearDebugOutput();
            g.background(.55, .8, .1);
            g.pushMatrix();
            g.translate(g.width / 2, g.height / 2);

            var view = this;

            g.pushMatrix();
            g.translate(-camera.center.x, -camera.center.y);

            g.popMatrix();

            activeObjects = [];
            // Compile all the active objects

            var contentsArrays = [];
         
            // Compile all the arrays of contents into a single array
            activeObjects = activeObjects.concat.apply(activeObjects, contentsArrays);
            utilities.debugOutput("Simulating/drawing: " + activeObjects.length + " objects");

            // do update stuff
            update(g.millis() * .001);

            $.each(activeObjects, function(index, obj) {
                obj.update(time);
            });

            // Draw eaach layer in order
            drawLayer(g, {
                layer : "bg",
            });

            drawLayer(g, {
                layer : "main",
            });

            drawLayer(g, {
                layer : "overlay",
            });

            // Draw the touch
            
            g.popMatrix();

        };


        var drawLayer = function(g, options) {
            var p = new Vector(0, 0);

            world.draw(g, options);
            $.each(activeObjects, function(index, obj) {
                // figure out where this object is, and translate appropriately
                g.pushMatrix();
                if (obj.position !== undefined) {
                    setToScreenPosition(p, obj.position);
                    g.translate(p.x, p.y);

                }
                obj.draw(g, options);
                g.popMatrix();

            });

        };

        var getTouchableAt = function(p) {
        	/*
            // utilities.debugOutput("Get touchable at " + p);

            var touchables = [];
            var target = new Vector(p.x + camera.center.x, p.y + camera.center.y, 0);

            var minDist = 10;
            // go through all the objects and find the closest (inefficient, but fine for now)
            // utilities.debugArrayOutput(activeObjects);

            var length = activeObjects.length;
            $.each(activeObjects, function(index, obj) {

                if (obj !== undefined) {

                    var d = obj.position.getDistanceTo(target);
                    // utilities.debugOutput(obj + ": " + Math.floor(d));
                    //  utilities.debugOutput(obj + ": " + d);
                    if (obj.radius)
                        d -= obj.radius;
                    if (d < minDist) {

                        touchables.push(obj);

                    }
                }

            });
            //          utilities.debugOutput("...done<br> ");
            // utilities.debugArrayOutput(touchables);

            return touchables;*/

        };

        // attaching the sketchProc function to the canvas
        console.log("START UNIVERSE VIEW");
        canvas = document.getElementById("world_canvas");
        var initProcessing = function(g) {

            addDrawingUtilities(g);
            g.size(dimensions.width, dimensions.height);

            g.colorMode(g.HSB, 1);
            g.background(.45, 1, 1);

            g.draw = function() {
                if (fopapiGame.ready) {

                    draw(g);
                }
            };
        };
        processing = new Processing(canvas, initProcessing);

        return {
            dimensions : dimensions,

            setWorld : function(u) {
                world = u;
                camera = world.getCamera();

            },
            transformScreenToWorld : transformScreenToWorld,
            toWorldPosition : toWorldPosition,
            onUpdate : onUpdate,

            getTouchableAt : getTouchableAt,
        };
    })();

});

