var Game = (function () {

    this.canvas;        //reference to canvas 
    this.canvasContext;  // reference to canvas drawing context
    this.level;          // manages all the objects 


    function Game() {

        Graphics.init();
        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");
	  
        Physics.init(this.canvas);  
        this.playerOne = new Player(10,10);  

        // Creating the level
        this.level = new Level('data/levels/level1.json');
    }

    Game.prototype.update = function () {     
      //update code ...this.canvas
      this.playerOne.update();     
    };

    Game.prototype.draw = function () {
      this.playerOne.Draw(this.canvasContext);
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
