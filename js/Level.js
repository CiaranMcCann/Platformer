// Used to manage the loading and exporting of maps
var Level = (function(){

	this.levelEnities; // holds all the enities

	//Takes a level as a JSON string
	function Level(levelfile){

		this.levelEnities = [];

		$.getJSON(levelfile, function(data) {
		  var items = [];

		  $.each(data, function(key, val) {
		    items.push('<li id="' + key + '">' + val + '</li>');
		  });

		  $('<ul/>', {
		    'class': 'my-new-list',
		    html: items.join('')
		  }).appendTo('body');
		});
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