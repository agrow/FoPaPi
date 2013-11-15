/**
 * @author April Grow
 */

define(["inheritance"], function(Inheritance) {
    return (function() {

		var toolCount = 0;
		
        var Tool = Class.extend({
            init : function(label) {
                this.idNumber = toolCount++;
                this.label = label;
                this.initializeTool();
            },
            
            activate : function(){
            	fopapiGame.setActiveTool(this);
            },
            
            deactivate : function(){
            	
            },
            
            //==========================================================
            //==========================================================
            // Tool event handlers
            initializeTool : function() {

            },

            touchMove : function(touch) {
                this.distanceSinceLastSpawn += touch.planeOffset.magnitude();
                if (this.onMove)
                    this.onMove(touch);
            },
            touchDrag : function(touch) {

                this.distanceSinceLastSpawn += touch.planeOffset.magnitude();
                if (this.onDrag)
                    this.onDrag(touch);

            },
            touchDown : function(touch) {
                console.log(this.label + " down!");
                this.distanceSinceLastSpawn = 0;
                if (this.onDown)
                    this.onDown(touch);
            },
            touchUp : function(touch) {
                console.log(this.label + " up!");
                if (this.onUp)
                    this.onUp(touch);

            },
            
            

        });
        return Tool;
    })();

});