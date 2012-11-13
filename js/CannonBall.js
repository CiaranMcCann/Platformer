
var CannonBall = (function () {

	function CannonBall(pB2dWorld, xPos, yPos, catagoryBits, maskBits) {
	
		var fixDef = new b2FixtureDef();	
	    var bodyDef = new b2BodyDef();	
		
		fixDef.density = 1.0; 
		fixDef.friction = 0.5; 
		fixDef.restitution = 0.2;
		
		fixDef.shape= new b2CircleShape(0.3);		
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(xPos, yPos);
		bodyDef.isBullet = false;
		this.physicsBody = pB2dWorld.CreateBody(bodyDef);
		this.physicsBody.CreateFixture(fixDef);

		var filter = new b2FilterData();
		filter.categoryBits = catagoryBits;
		filter.groupIndex = 0;
		filter.maskBits = maskBits;
		this.physicsBody.GetFixtureList().SetFilterData(filter);
		
		this.active = false;
		this.timeAlive = 0;
	}
		
	CannonBall.prototype.fire = function(xPos, yPos, targetX, targetY) {

		targetX *= 50;
		targetY *= 50;

		this.physicsBody.SetPosition(new b2Vec2(xPos, yPos));
		this.physicsBody.SetLinearVelocity(new b2Vec2(0, 0));
		this.direction = new b2Vec2(targetX-xPos, targetY-yPos);
		this.direction.Normalize();
		this.direction = new b2Vec2(this.direction.x*200,this.direction.y*200);
		
		this.physicsBody.ApplyForce( this.direction, this.physicsBody.GetWorldCenter());
	};
	
	return CannonBall;
	
})();