var potions = 0;
var health = 100;
var bone = false;
var level1 = true;
var level2 = false;

gameMenu = {
    create: function(){
        bg = game.add.image(0, 0, 'menuBG');
        game.add.image(0, 0, 'title');
		var playButton = this.game.add.button(380,550,"play",this.playTheGame,this);
        var controlButton = this.game.add.button(100, 300, "controls", this.controls, this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
        //going to level select state
		this.game.state.start("LevelSelect");
	},
    controls: function(){
        //going to control display state
		this.game.state.start("Controls");
	}
}