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
		
		//this.seeSaw = new SeeSaw( 550, 400, 150, 5 );
        Physics.init(this.canvas);
        this.Level3 = new Level3();
        this.Level3.add(new BreakableBody(100,500,100,100));
    }

    Game.prototype.update = function () {
      
      //update code ...this.canvas
      this.playerOne.update();
	 
    Game.prototype.update = function () 
    {
        
    };

    Game.prototype.draw = function () {
      this.playerOne.Draw(this.canvasContext);
      //draw code ...

      /*var img = AssetManager.images["placeHolderImage"]; // Get my image from the asset manager

      this.canvasContext.drawImage(
        img,
        this.canvas.width/2 - img.width/2,
        this.canvas.height/2 - img.height/2
      )*/

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
