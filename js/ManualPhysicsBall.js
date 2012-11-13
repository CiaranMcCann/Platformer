
var ManualPhysicsBall = (function () {

	function ManualPhysicsBall(position, direction, force, mass) {
	
		this.position = new b2Vec2(Physics.metersToPixels(position.x), Physics.metersToPixels(position.y));
		this.velocity = new b2Vec2(direction.x*force, direction.y*force);
		this.acc = new b2Vec2(0, 9.81);
		this.mass = mass;
	}


	ManualPhysicsBall.prototype.update = function(incTime, cxt) {
	
	
		//this.acc.x += -(this.mass)*0.05*0.05*this.velocity.x*this.velocity.x;
		//this.acc.y += -(this.mass)*0.05*0.05*this.velocity.y*this.velocity.y;

		this.position.x += this.velocity.x*incTime + (0.5 * this.acc.x * incTime * incTime);
		this.position.y += this.velocity.y*incTime + (0.5 * this.acc.y * incTime * incTime);
		this.velocity.x += this.acc.x*incTime;
		this.velocity.y += this.acc.y*incTime;

	  	cxt.beginPath();
	    cxt.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
	    cxt.fillStyle = 'green';
	    cxt.fill();
	    cxt.lineWidth = 5;
	    cxt.strokeStyle = '#003300';
	    cxt.stroke();
	};

	return ManualPhysicsBall;
	
})();