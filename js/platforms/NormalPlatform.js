var NormalPlatform = (function() {
	

	function NormalPlatform(x,y,width,height)
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


		var filter = new b2FilterData();
		filter.categoryBits = Physics.PLATFORM;
		filter.groupIndex = 0;
		filter.maskBits = Physics.PLAYER_ONE | Physics.PLAYER_TWO | Physics.PLAYER_ONE_BALL | Physics.PLAYER_TWO_BALL;
		this.body.GetFixtureList().SetFilterData(filter);
	}

	return FloatingPlatform;

})();