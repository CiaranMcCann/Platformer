var Game = (function () {

    this.canvas;        //reference to canvas 
    this.canvasContext;  // reference to canvas drawing context
    this.level;          // manages all the objects 

    function Game() {
 
        Graphics.init();

        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvas);  

        // Creating the level
        this.level = new Level();

        //Adding objects to the world
        this.level.add(new FloatingPlatform(250,150,300,10));

        //Logger.debug(this.level.export());
    }

    Game.prototype.update = function () {
      
      //update code ...

    };

    Game.prototype.draw = function () {
        
      //draw code ...
    };

    Game.prototype.step = function () {
        
        Physics.world.Step(
              (1 / 60)   
           , 10       //velocity iterations
           , 10       //position iterations
        );
       Physics.world.DrawDebugData();
       Physics.world.ClearForces();

    };

    return Game;
})();
