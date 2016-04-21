var test;
var overworld;

levelSelect = {
  	create: function(){
        game.add.image(0, 0, "map");
        var icon1 = this.game.add.button(250, 310, "icon", this.playLevel1, this);
        icon1.anchor.setTo(0.5,0.5);
        
        var icon2 = this.game.add.button(540, 270, "icon", this.playLevel2, this);
        icon2.anchor.setTo(0.5,0.5);
        //Creating player character
        player = game.add.sprite(70, 400, "player");
        player.scale.setTo(.5, .5);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
           
    },
    
    playLevel1: function() {
        //going to Level 1: Spooky Castle
        this.game.state.start("PlayLevel");
    },
    
    playLevel2: function() {
        //going to Level2: Ruins in the Sky
        if (level1 == true) {
            this.game.state.start("Level2");
        }
    }
} 