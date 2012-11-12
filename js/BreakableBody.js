var BreakableBody = (function () {

    this.body; //Reference to body
    this.fixture; // refernce to fixture


    function BreakableBody(posX, posY, width, height) {
        this.positionX = posX;
        this.positionY = posY;
        var bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 1.0;
        fixDef.restitution = 0.0;
        fixDef.shape = new b2PolygonShape;

        fixDef.shape.SetAsBox(Physics.pixelToMeters(width / 2), Physics.pixelToMeters(height / 2));

        bodyDef.position.x = Physics.pixelToMeters(this.positionX);
        bodyDef.position.y = Physics.pixelToMeters(this.positionY);
        this.fixture = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef);
        this.body = this.fixture.GetBody();
    }
    BreakableBody.prototype.update = function () {

    };
    return BreakableBody;
})();

