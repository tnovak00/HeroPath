var gameTitle = function(game){}

var dragonmode = false;
var Khealth = 5;
var dragonShoot = false;

gameTitle.prototype = {
  	create: function(){
        bg = this.game.add.tileSprite(0, 0, 900, 650, 'sidewalk');
     
        //Creating map and collisions with tilemap
        var back = this.game.add.image(0, 0, 'background');
        var title = this.game.add.image(0, 0, 'title');
		var playButton = this.game.add.button(450,550,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}