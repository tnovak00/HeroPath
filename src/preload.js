var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(this.world.centerX,this.world.centerY,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		this.game.load.spritesheet("numbers","assets/numbers.png",100,100);
        
        this.game.load.tilemap('tilemap',  'assets/map.csv', null, Phaser.Tilemap.TILED_CSV); 
        this.game.load.image('jungle',  'assets/jungle.png');  
		this.game.load.image("play","assets/play.png");
		this.game.load.image("higher","assets/higher.png");
		this.game.load.image("lower","assets/lower.png");
		this.game.load.image("gameover","assets/gameover.png");
        
        ////
        
        this.game.load.image('title', 'assets/title.png');
        this.game.load.image('background', 'assets/forestBG.png');
        this.game.load.image('collision', 'assets/collision.png');
        this.game.load.image('Ecollision', 'assets/Ecollision.png');
        this.game.load.image('EcollisionLG', 'assets/EcollisionLG.png');
        this.game.load.image('apple', 'assets/goldenApple.png');
        this.game.load.spritesheet('appleSparkle', 'assets/appleSparkle.png', 25, 25);
        this.game.load.spritesheet('playerBunny', 'assets/playerBunny2.png', 53, 42);
        this.game.load.spritesheet('enemyBunny', 'assets/enemyBunny.png', 54, 42);
        this.game.load.spritesheet('oppBunny',  'assets/oppBunny.png', 54, 42);
        this.game.load.tilemap('tilemap',  'assets/map.csv', null, Phaser.Tilemap.TILED_CSV); 
        this.game.load.image('jungle',  'assets/jungle.png');  
        this.game.load.image('base',  'assets/base.png'); 
        this.game.load.audio('growl', 'assets/growl.mp3');
        this.game.load.audio('sparkleSFX', 'assets/sparkleSFX.wav');
        this.game.load.audio('yay', 'assets/yay.mp3');
        this.game.load.audio('music', 'assets/bully.mp3'); this.game.load.audio('alert', 'assets/alert.mp3'); 
        this.game.load.audio('party', 'assets/party.mp3'); 
        
        
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}