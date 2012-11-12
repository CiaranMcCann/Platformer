var Player = (function (){
	
	function Player(x,y) {
		
		this.position = b2Vec2(x,y);
		
		var box = new b2BodyDef;
		
      	box.type = b2Body.b2_dynamicBody;
      	box.allowSleep = false;
      	this.playerBody = null;
		var fixDef1 = new b2FixtureDef();
		var fixDef2 = new b2FixtureDef();
      	fixDef1.shape = new b2PolygonShape;
      	fixDef2.shape = new b2CircleShape(Math.random() + 0.1);

        fixDef1.shape.SetAsBox(Math.random() + 0.1,Math.random() + 0.1);

        box.position.x = Math.random() * 25;
        box.position.y = Math.random() * 10;
		
 		this.currentVolicty = null;
 		this.playerBody = Physics.world.CreateBody(box);
 		this.playerBody.CreateFixture(fixDef1);
		this.playerBody.CreateFixture(fixDef2);
		this.maxJump = 60;
		this.maxJump = 30;
		this.jump = 0;
 		this.jumpnow = false;

	}
	Player.prototype.update = function()
	{
		this.currentVolicty = this.playerBody.GetLinearVelocity();

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
		
	};

	return Player;
})();
