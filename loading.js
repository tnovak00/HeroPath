var player;

loading = {
	preload: function(){
		// preloading various assets
        game.load.image("bg", "assets/bg.jpg");
        game.load.image("title", "assets/title.png")
        game.load.image("spikes", "assets/spikes.png");
        game.load.image("map", "assets/map_bg.png");
        game.load.image("icon", "assets/icon.png");
        game.load.image("menuBG", "assets/cloudy_bg.jpg");
        game.load.image("controlsBG", "assets/cloudy_controls.jpg");
        game.load.image('heart', 'assets/heart.png');
        game.load.tilemap('level1', 'assets/Maps/level1.csv', null, Phaser.Tilemap.TILED_CSV);
        game.load.image('castle', 'assets/Maps/castle.png');
        game.load.image("play", "assets/play.jpg");
        game.load.image("backMenu", "assets/backMenu.jpg");
        game.load.image("controls", "assets/controls.jpg");
        game.load.image("itemButton", "assets/itemButton.jpg");
        game.load.image("attackButton", "assets/attackButton.jpg");
        game.load.image("talkButton", "assets/talkButton.jpg");
        game.load.image("specialButton", "assets/specialButton.jpg");
        game.load.image("defendButton", "assets/defendButton.png");
        game.load.image("bone", "assets/bone.png");
        game.load.image("cerberus", "assets/cerberus.png");
        game.load.image("itemMenu", "assets/itemPopup.jpg");
        game.load.image("specialMenu", "assets/specialPopup.jpg");
        game.load.image("back", "assets/back.png");
        game.load.image('battleBG', 'assets/battleBG.jpg');
        game.load.image('dialogue', 'assets/dialogue.png');
        game.load.image('dialogue2', 'assets/dialogue2.png');
        game.load.spritesheet("wow", "assets/wow.png", 421, 355);
        game.load.spritesheet("player", "assets/rolloED.png", 171, 243);
        game.load.spritesheet("skeleton", "assets/skeleton.png", 34, 46);
        game.load.spritesheet("bat", "assets/bat.png", 32, 32);
        game.load.spritesheet("chest", "assets/chest.png", 46, 36);
        
        // MUSIC
        
        game.load.audio("battle", "assets/Sound/battle.mp3");
        game.load.audio("castle", "assets/Sound/castle.mp3");
        game.load.audio("dogbite", "assets/Sound/dogbite.mp3");
        game.load.audio("growl", "assets/Sound/growl.mp3");
        game.load.audio("growlbark", "assets/Sound/growlbark.mp3");
        game.load.audio("jump", "assets/Sound/jump.mp3");
        game.load.audio("ouch", "assets/Sound/ouch.mp3");
        game.load.audio("overworld", "assets/Sound/overworld.mp3");
        game.load.audio("swingsword", "assets/Sound/swingsword.mp3");
        game.load.audio("swordhit", "assets/Sound/swordhit.mp3");
        game.load.audio("treasure", "assets/Sound/treasure.wav");
        game.load.audio("win", "assets/Sound/win.mp3");
        game.load.audio("woof", "assets/Sound/woof.mp3");
        game.load.audio("menu", "assets/Sound/menu.wav");
	},
  	create: function(){
  		// going to menu state
		game.state.start("GameMenu");
	}
}     