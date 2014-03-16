/**
 * @author April Grow
 */

define(["inheritance", "modules/models/vector"], function(Inheritance, Vector) {
    return (function() {

        var FopapiProject = Class.extend({
            init : function() {
                this.pictureFile; // File Obj
                this.picture; // the raw image data string
                this.img; // Javascript Image object
            },
            
            loadImage : function(input){
            	
            	if(input.files && input.files[0]){
            		fopapiGame.liveProject.pictureURL = input.files[0];
            		var reader = new FileReader();
            		
            		//TO DO: CHECK THE TYPE input.files[0].type === "image/jpeg" or whatever
            		
            		reader.onload = function(e){
            			
            			var img = new Image;
            			img.onload = function(){
            				//console.log(img);
            				/*
            				var divAspect = 500/600;
            				var imgAspect = img.width/img.height;
            				if(imgAspect<divAspect) $("#imgPreview").attr("height", "100%");
            				if(imgAspect>divAspect) $("#imgPreview").attr("width", "100%");
            				*/
            			};
            			img.src = e.target.result;
            			fopapiGame.liveProject.img = img;
            			
            			fopapiGame.liveProject.picture = e.target.result;
            			$("#imgPreview").attr('src', e.target.result);
            			
            			// TOTALLY works
            			fopapiGame.work.setImageReady(e.target.result);
            		};
            		reader.readAsDataURL(input.files[0]);
            		fopapiGame.liveProject.pictureFile = input.files[0];
            		console.log("Reading file " + input.files[0].name);
            	} else {
            		$("#imgPreview").attr('src', "#");
            		console.log("No file selected...?");
            	}
            },
            

        });
        return FopapiProject;
    })();

});