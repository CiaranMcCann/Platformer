// Used to manage the loading and exporting of maps
var Level = (function(){

	this.levelEnities; // holds all the enities

	//Takes a level as a JSON string
	function Level(){

		this.levelEnities = [];
	}

	Level.prototype.add = function(enity) {
		this.levelEnities.push(enity);
	};

	Level.prototype.export = function() {
		return JSON.stringify(this.levelEnities);
	};

	Level.prototype.update = function() {
		
	};

	return Level;

})();