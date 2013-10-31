/**
 * @author Kate Compton
 */

// Create the way that the game will render on-screen

define(["modules/models/vector", "jQueryUITouchPunch", "jQueryHammer"], function(Vector, $) {
    var maxHistory = 50;
    return (function() {

        // Attach mouse events to the work window
        var workDiv = $("#work_canvas");
        var touch = {
            lastPressed : new Vector(0, 0),
            lastReleased : new Vector(0, 0),
            dragOffset : new Vector(0, 0),
            lastOffset : new Vector(0, 0),

            // History function
            history : [],
            historyIndex : 0,
            getHistory : function(stepsBack) {
                var index = (this.history.length + this.historyIndex - stepsBack) % this.history.length;
                return this.history[index];
            },

            getOffsetToHistory : function(stepsBack) {
                var p = this.getHistory(stepsBack);

                return this.currentPosition.getOffsetTo(p);
            },

            currentWorkPosition : new Vector(0, 0),
            currentPosition : new Vector(0, 0),
            center : new Vector(0, 0),
            overObjects : [],

            toWorkPosition : function(p) {
                return workView.toWorkPosition(p);

            },

            transformScreenToWork : function(p) {
                return workView.transformScreenToWorld(p);

            },

            pressed : false,
        };

        for (var i = 0; i < maxHistory; i++) {
            touch.history[i] = new Vector(0, 0, 0);
        }

        var workView;

        var setWorkView = function(view) {
            workView = view;
            touch.center.setTo(view.dimensions.width / 2, view.dimensions.height / 2);

            touch.setoWorkPosition = workView.setoWorkPosition;

        };

        var controlUpdateFunction = [];

        var onControl = function(f) {
            controlUpdateFunction.push(f);
        };
        
        var controlUpdated = function() {
            $.each(controlUpdateFunction, function(index, f) {
                f.call(undefined, touch);
            });
        };

        var initTouchFunctions = function() {

            workDiv.click(function(e) {
                var p = toRelative(this, e);

            });

            workDiv.mousemove(function(e) {
				
                var w = workView.dimensions.width;
                var h = workView.dimensions.height;

                var p = toRelative(this, e);
                // Find the offset since the last movement
                touch.lastOffset.setTo(p[0] + touch.currentPosition.x, p[1] + touch.currentPosition.y);
                touch.currentPosition.setTo(p[0] - w / 2, p[1] - h / 2);
                touch.currentWorkPosition.setTo(touch.currentPosition);
                touch.transformScreenToWork(touch.currentWorkPosition);

                touch.historyIndex = (touch.historyIndex + 1) % maxHistory;
                touch.history[touch.historyIndex] = touch.currentPosition.clone();

                touch.overObjects = workView.getTouchableAt(touch.currentPosition);

                if (touch.pressed) {

                    touch.dragOffset.setTo(-touch.lastPressed.x + p[0], -touch.lastPressed.y + p[1]);
                    /*
                    if (touch.activeTool !== undefined) {
                        touch.activeTool.touchDrag(touch);

                    }*/

                } else {
                    /*touch.activeTool.touchMove(touch);*/

                }
                controlUpdated();
				
            });

            workDiv.mouseup(function(e) {
            	
                touch.pressed = false;
                var p = toRelative(this, e);
                touch.dragOffset.mult(0);
                touch.lastReleased.setTo(p[0], p[1]);

                // If there is an active tool, pass the event to it
                
                if (touch.activeTool !== undefined) {
                    touch.activeTool.touchUp(touch);
                }
            });

            workDiv.mousedown(function(e) {
            	
                touch.pressed = true;
                var p = toRelative(this, e);
                touch.lastPressed.setTo(p[0], p[1])
				
                if (touch.activeTool !== undefined) {
                    touch.activeTool.touchDown(touch);
                }
				
            });

            var hammertime = workDiv.hammer();

        };
        
        //=======================================================
        // Helper
        var toRelative = function(div, e) {

            //   var parentOffset = $(div).parent().offset();
            var parentOffset = $(div).offset();
            //or $(this).offset(); if you really just want the current element's offset
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
            return [relX, relY];
        };

        //=======================================================
        // Initialize the work controller

        console.log("START UNIVERSE CONTROLLER");

        // Make the touch accessible from anywhere (but use sparingly!)
        var init = function() {
            fopapiGame.touch = touch;
            initTouchFunctions();
        };

        return {
            init : init,
            onControl : onControl,
            setWorkView : setWorkView,

        };
    })();

});
