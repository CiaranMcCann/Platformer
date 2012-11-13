// Floating platform  - Jira task [RWMPA-2]
// When the player jumps onto the platform 
// its velocity is "transfered" to the plaform
var FloatingPlatform = (function() {
	

	function FloatingPlatform(x,y,width,height)
	{
		this.body; //Reference to body
		this.fixture; // refernce to fixture

		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_kinematicBody;

		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.friction = 1.0;
		fixDef.restitution = 0.0;
		fixDef.shape = new b2PolygonShape;

		fixDef.shape.SetAsBox(Physics.pixelToMeters(width/2),Physics.pixelToMeters(height/2));

		bodyDef.position.x =  Physics.pixelToMeters(x);
		bodyDef.position.y =  Physics.pixelToMeters(y);
		this.fixture = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
		this.body = this.fixture.GetBody();

		this.body.SetUserData( "FloatingPlatform"+x+y+width+height ); //Give it a unqine name

		var _this = this;
		Physics.addContactListener(function(contact){
            
            //check if the player and this platform are colliding
            var isPlayer1Colliding = Physics.isObjectColliding("player1",_this.body.GetUserData(), contact);
            var isPlayer2Colliding = Physics.isObjectColliding("player2",_this.body.GetUserData(), contact);

            if(isPlayer1Colliding || isPlayer2Colliding )
            {
            	_this.body.SetLinearVelocity(new b2Vec2(1.1,0));
            	//_this.body.ApplyImpulse(new b2Vec2(200.5,0),_this.body.GetPosition()); 
            }
            
		});
	}

	FloatingPlatform.prototype.update = function() {
		
	};

	return FloatingPlatform;

})();