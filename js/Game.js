var Game = (function () {

    function Game() {

        Graphics.init();
        this.canvas = Graphics.createCanvas("gameCanvas");
        this.canvasContext = this.canvas.getContext("2d");
        Physics.init(this.canvas);
        this.Level3 = new Level3();
        this.Level3.add(new BreakableBody(100,500,100,100));
    }

    Game.prototype.update = function () 
    {
        
    };

    Game.prototype.draw = function () {

    };

    Game.prototype.step = function () {

        Physics.world.Step(
              (1 / 60)
           , 10       //velocity iterations
           , 10       //position iterations
        );
        Physics.world.DrawDebugData();
        Physics.world.ClearForces();

    };

    return Game;
})();
