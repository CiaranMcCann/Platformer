var Game = (function () {


    function Game() {
 
        Graphics.init();

        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");
		
        Physics.init(this.canvas);
			
		this.cannonBalls = new Array();
	
		this.playerX = 200;
		this.playerY = 100;
			
		this.targetX = this.playerX + 50;
		this.targetY = this.playerY;
		
		this.cannonBalls[0] = new CannonBall(Physics.world,  this.playerX,  this.playerY);	
		this.cannonBalls[1] = new CannonBall(Physics.world,  this.playerX,  this.playerY);
		this.cannonBalls[2] = new CannonBall(Physics.world,  this.playerX,  this.playerY);
    }

    Game.prototype.update = function () {
      
      //update code ...this.canvas
	  
		if(keyboard.isKeyDown(37)) { // Left arrow
			
			this.playerX -= 1;
			this.targetX -= 1;
		}
		if(keyboard.isKeyDown(39)) { // Right arrow
		
			this.playerX += 1;
			this.targetX += 1;
		}
		if(keyboard.isKeyDown(38)) { // Up arrow
		
			this.playerY -= 1;
			this.targetY -= 1;
		}
		if(keyboard.isKeyDown(40)) { // Down arrow
		
			this.playerY += 1;
			this.targetY += 1;
		}
		
		if(keyboard.isKeyDown(13)) { // Enter
			
			var i = 0;
			for(i; this.cannonBalls[i].active == true && i <  this.cannonBalls.length-1; i++) {	}
			
			if(this.cannonBalls[i].active == false) {
				this.cannonBalls[i].fire(this.playerX, this.playerY, this.targetX, this.targetY);
			}
		}
		
		if(keyboard.isKeyDown(190) || keyboard.isKeyDown(188)) {
		
			var angle;
			keyboard.isKeyDown(190) ? angle = 1 : angle = -1;
			
			// Rotates target point around player pos
			var s = Math.sin(angle*(Math.PI/180));
			var c = Math.cos(angle*(Math.PI/180));
			// translate point back to origin:
			this.targetX -= this.playerX;
			this.targetY -= this.playerY;
			// rotate point
			var xnew = this.targetX * c - this.targetY * s;
			var ynew = this.targetX * s + this.targetY * c;
			// translate point back:
			this.targetX = xnew + this.playerX;
			this.targetY = ynew + this.playerY;
		}
	  
	    this.canvasContext.fillStyle = "rgb(155, 0, 0)";
		this.canvasContext.fillRect(this.targetX-2, this.targetY-2, 4, 4);
		this.canvasContext.fill();
		
		this.canvasContext.fillStyle = "rgb(0, 155, 0)";
		this.canvasContext.fillRect(this.playerX-5, this.playerY-5, 10, 10);
		this.canvasContext.fill();
    };

    Game.prototype.draw = function () {
        
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
