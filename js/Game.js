var Game = (function () {

    this.canvas;        //reference to canvas 
    this.canvasContext;  // reference to canvas drawing context
    this.level;          // manages all the objects 


    function Game() {

        Graphics.init();
        this.canvas = Graphics.createCanvas("gameCanvas");

        this.canvasContext = this.canvas.getContext("2d");
		
        Physics.init(this.canvas);
			
       
        Physics.init(this.canvas);  
        this.playerOne = new Player(10,10, [68,65,87,32,190,188], Physics.PLAYER_ONE, Physics.PLATFORM | Physics.PLAYER_TWO_BALL | Physics.PLAYER_TWO, "player1");  
        this.playerTwo = new Player(10,10, [39,37,38,98,99,97], Physics.PLAYER_TWO, Physics.PLATFORM | Physics.PLAYER_ONE_BALL | Physics.PLAYER_ONE, "player2");  
       
        //                          x , y.[left,right,up,shoot,rotateleft,rotateright]
        //this.playerOne = new Player(10,10,[68,65,87,32,190,188]);  
        //this.playerTwo = new Player(10,10,[39,37,38,98,99,97])
        // Creating the level
        // this.level = new Level('data/levels/level1.json');
    }

    Game.prototype.update = function () {     
      //update code ...this.canvas
     

      this.playerOne.update();
      this.playerTwo.update();
    };

    Game.prototype.draw = function () {
      this.playerOne.Draw(this.canvasContext);
      this.playerTwo.Draw(this.canvasContext);
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
