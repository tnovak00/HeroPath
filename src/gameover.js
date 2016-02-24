var gameOver = function(game){}

gameOver.prototype = {
  	create: function(){
        var style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        var text = this.game.add.text(350, 200, "You scored: " + capture, style);
  		var gameOverTitle = this.game.add.sprite(this.world.centerX,this.world.centerY,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(this.world.centerX,400, "play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
        capture = 0;
		this.game.state.start("TheGame");
	}
}