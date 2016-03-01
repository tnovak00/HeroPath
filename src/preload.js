var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(this.world.centerX,this.world.centerY,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);  
		this.game.load.image("play","assets/button.png");
		this.game.load.image("gameover","assets/gameover.png");
        
        ////
        
        this.game.load.image('title', 'assets/title.png');
        this.game.load.image('background', 'assets/sidewalk2.png');
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('scoreKid', 'assets/scoreKid.png');
        this.game.load.image('scoreDra', 'assets/scoreDra.png');
        this.game.load.image('cone', 'assets/cone.png');
        this.game.load.image('heart', 'assets/health.png');
        this.game.load.image('gun', 'assets/gun.png');
        this.game.load.image('candy', 'assets/candy.png');
        this.game.load.audio('sparkle', 'assets/sparkleSFX.wav');
        this.game.load.audio('ow', 'assets/ow.wav');
        this.game.load.audio('burn', 'assets/burn.wav');
        this.game.load.audio('yay', 'assets/yay.wav');
        this.game.load.audio('bones', 'assets/bones.wav');
        this.game.load.audio('growl', 'assets/growl.wav');
        this.game.load.audio('kidmusic', 'assets/kidmusic.mp3');
        this.game.load.audio('dragonmusic', 'assets/dragonmusic.mp3');
        this.game.load.spritesheet('dog', 'assets/dog.png', 30, 18);
        this.game.load.spritesheet('fire', 'assets/fire.png', 19, 13);
        this.game.load.spritesheet('bone', 'assets/bonedragon.png', 36, 31);
        this.game.load.spritesheet('a1', 'assets/a1.png', 130, 104);
        this.game.load.spritesheet('a2', 'assets/a2.png', 130, 99);
        this.game.load.spritesheet('a3', 'assets/a3.png', 130, 96);
        this.game.load.spritesheet('redgem', 'assets/redgem.png', 56, 36)
        this.game.load.spritesheet('player', 'assets/kidbike2.png', 37, 40);
        this.game.load.spritesheet('dragon',
        'assets/dragon.png', 52, 45);
        this.game.load.spritesheet('bluegem',
        'assets/bluegem.png', 27, 32);
        
        
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}