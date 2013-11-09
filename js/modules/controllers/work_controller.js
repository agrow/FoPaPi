/**
* @author Kate Compton
*/

// Create the way that the game will render on-screen

define(["modules/models/vector", "jQueryUITouchPunch", "jQueryHammer"], function(Vector, $) {
    var maxHistory = 50;
    return (function() {

        // Attach mouse events to the work window
        var workDiv = $("#work_canvas");
        var workView;
        
        var touch = {
            lastPressed : new Vector(0, 0),
            lastReleased : new Vector(0, 0),
            dragOffset : new Vector(0, 0),
            lastOffset : new Vector(0, 0),
            
            ///// Not all of these may be used
            screenOffset : new Vector(0, 0),
            planeOffset : new Vector(0, 0),
            planeLast : new Vector(0, 0),
            screenLast : new Vector(0, 0),
            screenPosition : new Vector(0, 0),
            planePosition : new Vector(0, 0),
            planeCenterOffset : new Vector(0, 0),
            screenPct : new Vector(0, 0),
            //////

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
                return workView.transformScreenToWork(p);

            },

            pressed : false,
            
            // Update on the frame refresh
            update : function(time) {

            },
            
            updateTouchPositions : function(p) {
            	utilities.debugOutput("updating TouchPositions");
            	//utilities.debugOutput("uTP p: " + p);
            	//console.log(p);
            	
                var touch = this;
                if (p === undefined) {
                	
                    p = touch.screenPosition;
                }
                
                // If the position is updated
                // set the last positions to the current position;
                touch.planeLast.setTo(touch.planePosition);
                touch.screenLast.setTo(touch.screenPosition);
                touch.screenPosition.setTo(p);
                if (touch.pressed) {

                    touch.dragOffset.setTo(-touch.lastPressed.x + p.x, -touch.lastPressed.y + p.y);
                }
                
               

				//var p = toRelative(this, e);
                
                // Find the offset since the last movement
                //touch.planePosition.setTo(pagePositionToRelativePosition(touch.screenPosition, 
                touch.currentPosition.setTo(p.x, p.y);
                touch.planePosition.setTo(p.x, p.y);
                touch.currentWorkPosition.setTo(touch.currentPosition);
                touch.transformScreenToWork(touch.currentWorkPosition);
                //touch.lastOffset.setTo(p[0] + touch.currentPosition.x, p[1] + touch.currentPosition.y);
                //touch.currentPosition.setTo(p[0] - w / 2, p[1] - h / 2);
                //touch.currentWorkPosition.setTo(touch.currentPosition);
                //touch.transformScreenToWork(touch.currentWorkPosition);

				/*
                touch.historyIndex = (touch.historyIndex + 1) % maxHistory;
                touch.history[touch.historyIndex] = touch.currentPosition.clone();

                touch.overObjects = workView.getTouchableAt(touch.currentPosition);

                if (touch.pressed) {

                    touch.dragOffset.setTo(-touch.lastPressed.x + p[0], -touch.lastPressed.y + p[1]);
                } 
                controlUpdated();
                */
                // Set the offsets
                touch.screenOffset.setToAddMultiple(touch.screenPosition, 1, touch.screenLast, -1)

                touch.planeOffset.setToAddMultiple(touch.planePosition, 1, touch.planeLast, -1);

                // How far is the touch from the screen's center position on the plane?
                //touch.planeCenterOffset.setToDifference(universeView.camera.position, touch.planePosition);

				var w = workView.dimensions.width;
                var h = workView.dimensions.height;
                
                touch.screenPct.setTo(touch.screenPosition);
                touch.screenPct.x /= w * .5;
                touch.screenPct.y /= h * .5;
                touch.screenPct.z = 0;

                // Add to the history
                touch.historyIndex = (touch.historyIndex + 1) % maxHistory;
                touch.history[touch.historyIndex] = new Vector(touch.planePosition);
                
            },
            
            // Clear the touch output and get the objects/regions that it's over
            updateTouchContext : function() {
                //debugTouch.output("update context");

                // Get the objects that the cursor is over
                touch.overObjects = workView.getTouchableAt(touch.planePosition);
                var dragCount = 0;

            },
            
            toScreenPosition : function(p) {
                var p2 = new Vector(p);
                p2.sub(this.center);
                return p2;
            },
            
            //============================================================
            //============================================================
            //============================================================
            //============================================================
            // Touch functions
            touchDrag : function(p) {
                touch.updateTouchPositions(p);
                touch.updateTouchContext();

                if (touch.pressed) {

                    // Count how long it's been dragged
                    if (!touch.dragging) {
                        dragCount++;
                        if (dragCount > 2) {
                            touch.dragging = true;
                        }
                    }

                    if (touch.dragging) {

                        if (touch.activeTool)
                            touch.activeTool.touchDrag(touch);
                        else
                            console.log("Drag with no tool");
                    }
                }
                //touch.output();
            },

            touchDoubletap : function(p) {
				touch.updateTouchPositions(p);
                touch.updateTouchContext();

                // Do something with the clicked stuff
                if (touch.overObjects.length > 0) {

                    console.log("CLICK " + touch.overObjects[0]);
                    if (touch.overObjects[0] && !touch.overObjects[0].inFocus){
                        workView.focusOn(touch.overObjects[0], .2);
                        fopapiGame.qManager.satisfy("Navigating Space", 2);
                    }
                } else
                    console.log("CLICKED NOTHING");

                //touch.output();
            },

            touchUp : function(p) {
            	//console.log("tU p: " + p);
                touch.updateTouchPositions(p);
                touch.updateTouchContext();

                touch.dragging = false;
                touch.pressed = false;
                touch.dragOffset.mult(0);
                touch.lastReleased.setTo(p);

                // If there is an active tool, pass the event to it
                if (touch.activeTool !== undefined) {
                    touch.activeTool.touchUp(touch);
                }
                dragCount = 0;

                //touch.output();
            },

            touchDown : function(p) {
                touch.updateTouchPositions(p);
                touch.updateTouchContext();

                touch.pressed = true;
                touch.lastPressed.setTo(p)

                if (touch.activeTool !== undefined) {
                    touch.activeTool.touchDown(touch);
                }
                dragCount = 0;

                // touch the objects
                if (touch.overObjects.length > 0) {

                    console.log("PRESS " + touch.overObjects[0].name);
                    if (touch.overObjects[0]) {
                        if (touch.selectedObject) {
                            touch.selectedObject.deselect();
                        }

                        touch.selectedObject = touch.overObjects[0];
                        touch.selectedObject.select();
                    }
                } else
                    console.log("PRESS NOTHING");

                //touch.output();

            },
            /*
            touchMove : function(p){
            	touch.updateTouchPositions(p);
                touch.updateTouchContext();
            }*/
            
        };

        for (var i = 0; i < maxHistory; i++) {
            touch.history[i] = new Vector(0, 0, 0);
        }

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
			var touch = fopapiGame.touch;
	        console.log("Bind touch events");
	        // Mousewheel zooming
	        /* // .mousewheel not a function?
	        $("#work_canvas").mousewheel(function(event, delta) {
	            workView.modifyZoom(delta, true);
	
	            event.preventDefault();
	
	        });
	        */
	        
	        workDiv.on("mousemove", function(ev) {
	        	//console.log(ev);
	            //var p = toRelative(workDiv, ev);
	            //console.log("mm p: " + p);
	            
	            var p2 = new Vector(ev.pageX, ev.pageY);
	            var relPos = pagePositionToRelativePosition(workDiv, p2);
	            var screenPos = touch.toScreenPosition(relPos);
	            
	            touch.updateTouchPositions(screenPos);
	        });
	        
	
	        // Bind these events to hammer actions
	
	        var eventToScreenPos = function(ev) {
	        	//console.log(ev);
	            var p = new Vector(ev.gesture.center.pageX, ev.gesture.center.pageY);
	            var relPos = pagePositionToRelativePosition(workDiv, p);
	            var screenPos = touch.toScreenPosition(relPos);
	
	            return screenPos;
	        };
	
	        var hammertime = workDiv.hammer();
	        hammertime.on("touch", function(ev) {
	            var p = eventToScreenPos(ev);
	            touch.lastAction = "touch";
	            touch.lastActionOutput = p;
	            touch.touchDown(p);
	
	        });
	
	        hammertime.on("doubletap", function(ev) {
	            var p = eventToScreenPos(ev);
	            touch.lastAction = "doubleclick";
	            touch.lastActionOutput = p;
	
	            touch.touchDoubletap(p);
	
	        });
	
	        hammertime.on("drag", function(ev) {
	            var p = eventToScreenPos(ev);
	            touch.lastAction = "drag";
	            touch.lastActionOutput = p;
	
	            touch.touchDrag(p);
	
	        });
	
	        hammertime.on("release", function(ev) {
	            var p = eventToScreenPos(ev);
	            touch.lastAction = "release";
	            touch.lastActionOutput = p;
	            touch.touchUp(p);
	        });
	        
	
	        touch.lastAction = "none";
	        touch.update = function() {
	        	//updateTouchPositions();
	            if (touch.pressed)
	                touch.touchDrag();
	        };
	
	        //=====

        };
        
        //=======================================================
        // Helper
        var toRelative = function(div, e) {

            // var parentOffset = $(div).parent().offset();
            var parentOffset = $(div).offset();
            //or $(this).offset(); if you really just want the current element's offset
            //var relX = e.pageX - parentOffset.left;
            //var relY = e.pageY - parentOffset.top;
            //return [relX, relY];
            
            var relPos = new Vector(e.pageX - parentOffset.left, e.pageY - parentOffset.top);
	        return relPos;
        };
        
        var pagePositionToRelativePosition = function(div, pagePos) {
	
	        //   var parentOffset = $(div).parent().offset();
	        var parentOffset = $(div).offset();
	        //or $(this).offset(); if you really just want the current element's offset
	
	        var relPos = new Vector(pagePos.x - parentOffset.left, pagePos.y - parentOffset.top);
	        return relPos;
	    };

        //=======================================================
        // Initialize the work controller

        console.log("START UNIVERSE CONTROLLER");

        // Make the touch accessible from anywhere (but use sparingly!)
        var init = function(view) {
        	workView = view;
            touch.center.setTo(view.dimensions.width / 2, view.dimensions.height / 2);
            touch.setoWorkPosition = workView.setoWorkPosition;
        	
            fopapiGame.touch = touch;
            initTouchFunctions();
        };

        return {
            init : init,
            onControl : onControl,

        };
    })();

});