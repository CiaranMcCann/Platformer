var Game = (function () {

    this.canvas;        //reference to canvas 
    this.canvasContext;  // reference to canvas drawing context
    this.level;          // manages all the objects 

    function Game() {

        setTimeout(function () {
            $('#splashScreen').fadeOut('normal');
        }, 1000);

        Graphics.init();
        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");
		
        Physics.init(this.canvas);  
     
        // Creating the level
        this.level = new Level(); //FIXME Proxy fucking this up
		    this.level.loadUp(level1JSON);
        //this.level.loadUp(level2JSON);

        	
    }

    Game.prototype.update = function () {     
      this.level.update();
    };

    Game.prototype.draw = function () {
      this.level.draw(this.canvasContext);
      
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
