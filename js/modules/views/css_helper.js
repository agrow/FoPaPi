/**
 * @author April Grow
 */

define([], function() {
	
	var divCounter = 0;
	var buttonCounter = 0;
	var textCounter = 0;
	
    var init = function() {

		fopapiGame.cssHelper = this;
    };
    
    // Beware! Special case testing! //////////////
    
    var makeFileUpload = function(parentID, onChange){
    	var parent = $("#" + parentID);
    	
    	var input = $('<input/>')
			    			.attr('type', 'file')
			    			.attr('name', 'FileUpload')
			    			.attr('id', 'fileUpload')
			    			.change(onChange);
    	
    	parent.append(input);
    }
    
    ///////////////////////////////////////////////
    
    var makeDiv = function(parent, options){
    	divCounter++;
    	// Blah blah blah fill me in
    	
    	return divCounter;
    };
    
    var makeButton = function(parentID, text, onClick){
    	buttonCounter++;
    	
    	var parent = $("#" + parentID);
    	
    	var button = $("<div/>", {
    		id : buttonCounter + "_button",
    		"class" : "button",
    	});
    	
    	button.html(text);
    	button.button().click(onClick);
    	
    	parent.append(button);
    	
    	return buttonCounter;
    };
    
    var fetchButton = function(counter){
    	return $("#" + counter + "_button");
    };
    
    var makeText = function(parentID, text){
    	textCounter++;
    	var parent = $("#" + parentID);
    	
    	var text = $("<div/>", {
    		id : textCounter + "_text",
    		"class" : "text",
    	});
    	
    	text.html(text);
    	
    	parent.append(text);
    	
    	return textCounter;
    }

    return {
        init : init,
        makeFileUpload : makeFileUpload,
        makeDiv : makeDiv,
        makeButton : makeButton,
        fetchButton : fetchButton,
    };

});
