var Game = (function () {

    function Game() {
 
        Graphics.init();

        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");

        Physics.init(this.canvas);    
		
		this.seeSaw = new SeeSaw( 550, 400, 150, 5 );
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
