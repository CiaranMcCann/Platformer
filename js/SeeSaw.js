// Name:	SeeSaw.js
// Author: Gearóid Neville
// Brief:	This is the See Saw Class. This class sets up,
//			creates, and updates all the See Saw Objects
//			in the Game.
// Arguments: N/A
// Returns: N/A

var SeeSaw = ( function () {
	this._positionX;															// The X Position of a See Saw.
	this._positionY;															// The Y Position of a See Saw.
	this._width;																// The Width of a See Saw.
	this._height;																// The Height of a See Saw.
	this._body;																    // Physical Body of a See Saw.
	this._bodyDef;															    // The Body Definition of a See Saw.
	this._bodyFixtureDef;													    // The Body Fixture Definition of a See Saw.
	this._pivotFixtureDef;														// The Pivot Fixture Definition of a See Saw.
	this._revoluteJointDef;														// The Revolute joint Definition used to make the See Saw.
	this._pivotRadius;
	this._pivotBody;
	this._pivotBodyDef;

	
	// Name: See Saw
	// Brief: This is the Constructor of the Class.
	//		  It initialises it's core members and draws the See Saw Object.
	// Arguments: posX   ( The X Position of the See Saw )
	//			  posY   ( The Y Position of the See Saw )
	//			  width  ( The width of the See Saw )
	//			  height ( The height of the See Saw )
	// Returns: N/A
	
	function SeeSaw( posX, posY, width, height ) {
		this._positionX = posX;													// Setting the X Position of a See Saw.
		this._positionY = posY;													// Setting the Y Position of a See Saw.
		this._width = width;													// Setting the Width of a See Saw.
		this._height = height;													// Setting the Height of a See Saw.
		
		this._bodyDef = new b2BodyDef;											// Create a new Body Definition for the See Saw Object.
		this._bodyDef.type = b2Body.b2_dynamicBody; 							// Define Object type.
		this._bodyDef.position.Set(Physics.pixelToMeters(this._positionX)		// Define Position.
		, Physics.pixelToMeters(this._positionY));
		this._bodyFixtureDef = new b2FixtureDef;								// Create a new Fixture Definition for a See Saw Object.		
		this._bodyFixtureDef.density = 10.0; 									// Define Density.
		this._bodyFixtureDef.friction = 0.4; 									// Define Friction.
		this._bodyFixtureDef.restitution = 0.03; 								// Define Restitution.
		this._bodyFixtureDef.shape = new b2PolygonShape; 						// Define Shape.
		this._bodyFixtureDef.shape.SetAsBox(Physics.pixelToMeters(this._width),	// Define Size.
		Physics.pixelToMeters(this._height));

		this._pivotBodyDef = new b2BodyDef;
		this._pivotBodyDef.type = b2Body.b2_staticBody;
		this._pivotBodyDef.position.Set(
			Physics.pixelToMeters(this._positionX), 
			Physics.pixelToMeters(this._positionY + (this._height/2))
		);
		this._pivotFixtureDef = new b2FixtureDef;								// Create a new Fixture Definition for a See Saw Object.		
		this._pivotFixtureDef.density = 0.1; 									// Define Density.
		this._pivotFixtureDef.shape = new b2CircleShape(Physics.pixelToMeters(5)); 						// Define Shape.
	
		this._body = Physics.world.CreateBody(this._bodyDef);					// Create the See Saw Body Object in the Game World.
		this._body = this._body.CreateFixture(this._bodyFixtureDef).GetBody();	// Create the defined Fixture for the See Saw Body.
	

		this._pivotBody = Physics.world.CreateBody(this._pivotBodyDef);					// Create the See Saw Body Object in the Game World.
		this._pivotBody = this._pivotBody.CreateFixture(this._pivotFixtureDef).GetBody();	// Create the defined Fixture for the See Saw Body.
		
		this._revoluteJointDef = new b2RevoluteJointDef;
		/*this._revoluteJointDef.BodyA = this._body;
		this._revoluteJointDef.BodyB = this._pivotBody;
		this._revoluteJointDef.collideConnected = true;
		this._revoluteJointDef.localAnchorA.Set(0,0);
		this._revoluteJointDef.localAnchorB.Set(0,0);
		*/
		this._revoluteJointDef.Initialize(this._body, this._pivotBody, this._body.GetWorldCenter());
		Physics.world.CreateJoint(this._revoluteJointDef);
		
		
		
		
		
	};
	
    return SeeSaw;
} )();