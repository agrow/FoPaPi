/**
 * @author Kate Compton
 */

// Its the World!

define(["modules/models/vector", "kcolor"], function(Vector, KColor) {

    return (function() {

        var camera;

        var toAdd = [];

        function draw(g, options) {


        }

        function spawn(object) {
            toAdd.push(object);
        }

        function update(time) {
            fopapiGame.time.worldTime = time.total;

        };

        function init() {
            console.log("INIT UNIVERSE");

            camera = {
                angle : new Vector(0, 0, 0),
                center : new Vector(0, 0, 0),
                zoom : 1,
                scrollingMovement : new Vector(20, 0, 0),

            };

        };
        
        function getCamera() {
            console.log(camera);
            return camera;
        }


        return {
            draw : draw,
            update : update,
            getCamera : getCamera,
            init : init,
        };

    })();

});
