var Player = (function (){
	
	function Player(x,y,keys) {

		var box = new b2BodyDef;
		this.keyCodes = keys;
      	box.type = b2Body.b2_dynamicBody;
      	box.allowSleep = false;
      	this.playerBody = null;
		this.fixDef1 = new b2FixtureDef();
		var fixDef2 = new b2FixtureDef();
      	this.fixDef1.shape = new b2PolygonShape;
      	fixDef2.shape = new b2CircleShape(0.5);

        this.fixDef1.shape.SetAsBox(0.5,0.5);

        box.position.x = Math.random() * 25;
        box.position.y = Math.random() * 10;
		this.pad = new GamePad();
		this.pad.Connect(); 
 		this.currentVolicty = null;
 		this.playerBody = Physics.world.CreateBody(box);
 		this.playerBody.CreateFixture(this.fixDef1);
		this.playerBody.CreateFixture(fixDef2);

		this.maxJump = 60;
		this.minJump = 30;
		this.jump = 0;

		this.targetDirection = this.playerBody.GetPosition().Copy();
		this.targetDirection.Multiply(5);

 		
 		this.cannonBalls = new Array();
 		this.cannonBalls[0] = new CannonBall(Physics.world,  this.playerBody.GetPosition().x, this.playerBody.GetPosition().y);	
		this.cannonBalls[1] = new CannonBall(Physics.world,  this.playerBody.GetPosition().x, this.playerBody.GetPosition().y);	
		this.cannonBalls[2] = new CannonBall(Physics.world,  this.playerBody.GetPosition().x, this.playerBody.GetPosition().y);	

	}

	Player.prototype.update = function()
	{
		this.currentVolicty = this.playerBody.GetLinearVelocity();
		var pos = this.playerBody.GetPosition();
		this.pad.Connect();
		if(this.pad.connected == true)
			this.pad.update();


		 if(keyboard.isKeyDown(this.keyCodes[0]) || this.pad.buttonPressed(15) || this.pad.controllAxis(0) > 0.5)
		 {
		 	this.currentVolicty.x = 5;
		 }
		 if(keyboard.isKeyDown(this.keyCodes[1]) || this.pad.buttonPressed(14) || this.pad.controllAxis(0) < 0 && this.pad.controllAxis(0) < -0.5 )
		 {
		 	this.currentVolicty.x = -5;
		 }
		 if(keyboard.isKeyDown(this.keyCodes[2]) || this.pad.buttonPressed(0))
		 {
		 	if(this.jump == 0 && this.currentVolicty.y == 0)
		 	{
		 		this.jump = 30;
		 	}
		 	if(this.maxJump <= this.jump && this.currentVolicty.y == 0)
		 	{
		 		this.currentVolicty.y = this.jump;
		 		this.jump = 0;
		 	}
		 	if(this.currentVolicty.y == 0)
		 	{
		 		this.jump = this.jump + 2;
		 	}
		 	
		 }
		 else if(this.jump != 0 && this.currentVolicty.y == 0)
		 {
		 	this.currentVolicty.y = this.jump;
		 	this.jump = 0;
		 }

		 // Enter to fire 
		if(keyboard.isKeyDown(this.keyCodes[3])) { 
			
			var i = 0;
			for(i; this.cannonBalls[i].active == true && i <  this.cannonBalls.length-1; i++) {	}
				
			if(this.cannonBalls[i].active == false) {

					var r = this.fixDef1.shape.m_radius*10;
					this.cannonBalls[i].fire(pos.x+r, pos.y+r, this.targetDirection.x, this.targetDirection.y);
			}
		}

		if(keyboard.isKeyDown(this.keyCodes[4]) || keyboard.isKeyDown(this.keyCodes[5])) {
			
			var angle;

			if(keyboard.isKeyDown(this.keyCodes[4]))
			{
				angle = 1
			}
			else
			{
			 	angle = -1;
			}
			
			// Rotates target point around player pos
			var s = Math.sin(angle*(Math.PI/180));
			var c = Math.cos(angle*(Math.PI/180));
			// translate point back to origin:
			this.targetDirection.x -= pos.x;
			this.targetDirection.y -= pos.y;

			// rotate point
			var xnew = this.targetDirection.x * c - this.targetDirection.y * s;
			var ynew = this.targetDirection.x * s + this.targetDirection.y * c;
			// translate point back:
			this.targetDirection.x = xnew + pos.x;
			this.targetDirection.y = ynew + pos.y;
		}

		this.playerBody.SetLinearVelocity(this.currentVolicty);
	};

	Player.prototype.jump = function()
	{

		this.currentVolicty = this.playerBody.GetLinearVelocity();
		this.currentVolicty.y = this.jump;
		this.playerBody.SetLinearVelocity(this.currentVolicty);
	};

	Player.prototype.Draw = function(ctx)
	{
		var pos =  this.playerBody.GetPosition();
		var targetDir = this.targetDirection.Copy();
		targetDir.Normalize();
		targetDir.Add(pos);

		ctx.fillStyle = "rgb(155, 0, 0)";
		ctx.fillRect( Physics.metersToPixels(targetDir.x)-2 , Physics.metersToPixels(targetDir.y)-2, 10,4);
		ctx.fill();

		ctx.fillStyle = "rgb(0, 155, 0)";
		ctx.fillRect( Physics.metersToPixels(pos.x)-5, Physics.metersToPixels(pos.y)-5, 10, 10);
		ctx.fill();
	};

	return Player;
})();
