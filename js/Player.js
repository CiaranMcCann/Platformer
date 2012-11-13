var Player = (function (){
	
	function Player(x, y, catagoryBits, maskBits) {

		var box = new b2BodyDef;
		
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
 		this.currentVolicty = null;
 		this.playerBody = Physics.world.CreateBody(box);
 		this.playerBody.CreateFixture(this.fixDef1);
		this.playerBody.CreateFixture(fixDef2);

		var filter = new b2FilterData();
		filter.categoryBits = catagoryBits;
		filter.groupIndex = 0;
		filter.maskBits = maskBits;
		this.playerBody.GetFixtureList().SetFilterData(filter);

		this.maxJump = 60;
		this.maxJump = 30;
		this.jump = 0;

		this.targetDirection = this.playerBody.GetPosition().Copy();
		this.targetDirection.Multiply(5);

 		this.jumpnow = false;

 		this.cannonBalls = new Array();
 		this.manualBalls = new Array();
		this.maxBalls = 30;
		this.curBalls = 0;
		this.triggerDown = false;
	}

	Player.prototype.update = function()
	{
		this.currentVolicty = this.playerBody.GetLinearVelocity();
		var pos = this.playerBody.GetPosition();
	

		 if(keyboard.isKeyDown(68))
		 {
		 	this.currentVolicty.x = 5;
		 }
		 if(keyboard.isKeyDown(65))
		 {
		 	this.currentVolicty.x = -5;
		 }
		 if(keyboard.isKeyDown(87))
		 {
		 	if(this.jump == 0)
		 		this.jump = 30;

		 	this.jump = this.jump + 2;
		 }
		 else if(this.jump != 0 && this.currentVolicty.y == 0)
		 {
		 	this.currentVolicty.y = this.jump;
		 	this.jump = 0;
		 }

		// Enter to fire 
		if(keyboard.isKeyDown(13)) { 
			
			if(this.triggerDown == false) {

				this.triggerDown = true;
			}
		}
		else if(this.triggerDown == true) {

			if(this.curBalls < this.maxBalls) {
				
				// Create and fire new cannon ball
				this.FireCannon(pos);
			}
			else if(this.curBalls >= this.maxBalls) {

				// Get index of longest living ball
				var index = 0;
				var lifeTime = 0;
				for(var i = 0; i < this.curBalls; i++) {
					if(this.cannonBalls[i].timeAlive > lifeTime) {

						lifeTime = this.cannonBalls[i].timeAlive;
						index = i;				
					}
				}

				// Delete longest living ball
				Physics.world.DestroyBody(this.cannonBalls[index].physicsBody);
				this.cannonBalls.splice(index, 1);
				this.manualBalls.splice(index, 1);
				this.curBalls--;

				// Create and fire new cannon ball
				this.FireCannon(pos);
			}

			this.triggerDown = false;
		}

		if(keyboard.isKeyDown(190) || keyboard.isKeyDown(188)) {
			
			var angle;

			if(keyboard.isKeyDown(190))
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
			this.targetDirection.x -= 0;
			this.targetDirection.y -= 0;

			// rotate point
			var xnew = this.targetDirection.x * c - this.targetDirection.y * s;
			var ynew = this.targetDirection.x * s + this.targetDirection.y * c;
			// translate point back:
			this.targetDirection.x = xnew + 0;
			this.targetDirection.y = ynew + 0;
		}

		this.playerBody.SetLinearVelocity(this.currentVolicty);

		for(var i = 0; i < this.curBalls; i++) {

			this.cannonBalls[i].timeAlive++;
			this.manualBalls[i].update(0.1);
		}
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

		/*for(var i = 0; i < this.curBalls; i++) {
			this.manualBalls[i].draw(ctx);
		}*/

		ctx.fillStyle = "rgb(155, 0, 0)";
		ctx.fillRect( Physics.metersToPixels(targetDir.x)-2 , Physics.metersToPixels(targetDir.y)-2, 4,4);
		ctx.fill();

		/*ctx.fillStyle = "rgb(0, 155, 0)";
		ctx.fillRect( Physics.metersToPixels(pos.x)-5, Physics.metersToPixels(pos.y)-5, 10, 10);
		ctx.fill();*/
	};

	Player.prototype.FireCannon = function(pos) 
	{
		// Create and fire new cannon ball
		this.cannonBalls[this.curBalls] = new CannonBall(Physics.world,  pos.x, pos.y, Physics.PLAYER_ONE_BALL, Physics.PLAYER_TWO | Physics.PLAYER_ONE_BALL | Physics.PLATFORM);
		var r = this.fixDef1.shape.m_radius*10;
		this.cannonBalls[this.curBalls].fire( pos.x+r, pos.y+r, this.targetDirection.x, this.targetDirection.y);
		this.manualBalls[this.curBalls] = new ManualPhysicsBall(pos,  this.targetDirection, 1, 5);
		this.curBalls++;
	};

	return Player;
})();
