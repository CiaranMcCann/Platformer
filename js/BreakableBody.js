var BreakableBody = (function () {

    this.body; //Reference to body
    this.fixture; // refernce to fixture



    function BreakableBody(posX,posY,width,height)
    {
 
            posX =  Physics.pixelToMeters(posX);
            posY =  Physics.pixelToMeters(posY);
            var fixDef = new b2FixtureDef;
            fixDef.density = 1.0;
            fixDef.friction = 1.0;
            fixDef.restitution = 0.0;
            fixDef.shape = new b2PolygonShape;
            this.position  = new b2Vec2(posX,posY);
            this.width = width;
            this.height = height;
            this.m_velocity = b2Vec2(0,100);
            //var m_velocity = new b2Vec2();
            var m_shape1 = new b2PolygonShape();
            var m_shape2 = new b2PolygonShape();

            // Ground body
      
            var bd = new b2BodyDef();
            var ground = Physics.world.CreateBody(bd);
        
            var shape = new b2EdgeShape();
            fixDef.shape.SetAsEdge(new b2Vec2(-40.0, 0.0), new b2Vec2(40.0, 0.0));
            ground.CreateFixture2(shape, 0.0);
    

            // Breakable dynamic body
            var breakBodyDef = new b2BodyDef();
            breakBodyDef.type = b2Body.b2_dynamicBody;
            breakBodyDef.position = new b2Vec2(posX,posY);

            this.width = width;
            this.height = height;
            //breakBodyDef.angle = 0.25 * 3.14;

            m_body1 = Physics.world.CreateBody(breakBodyDef);

            m_shape1 = new b2PolygonShape();
            m_shape1.SetAsOrientedBox(0.5, 0.5, new b2Vec2(-0.5, 0.0), 0.0);
            m_piece1 = m_body1.CreateFixture2(m_shape1, 1.0);

            m_shape2 = new b2PolygonShape();
            m_shape2.SetAsOrientedBox(0.5, 0.5, new b2Vec2(0.5, 0.0), 0.0);
            m_piece2 = m_body1.CreateFixture2(m_shape2, 1.0);

            breakBodyDef.position.x = posX;
            breakBodyDef.position.y = posY;


            this.fixture = Physics.world.CreateBody(breakBodyDef).CreateFixture(fixDef);
            this.body = this.fixture.GetBody();

    }
    return BreakableBody;
})();
