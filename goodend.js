var attack;
var talk;
var special;
var items;
var boss;
var itemMenu;
var back;
var itemSprites;
var itemsOpen = false;
var specialOpen = false;
var specialMenu;
var defend;
var defending = false;
var dialogueBox;
var dialogueString;
var dialogue = "";
var text;
var turn = true;
var potionNumber;

// SOUNDS
var goodendMusic;

goodend = {
	create: function(){
        
        //Sounds and music
        
        dialouge = "";
      //  game.clouds.stop();
        
        game.goodendMusic = game.add.audio('goodend');
        game.goodendMusic.loop = true;
        game.goodendMusic.play();
        game.goodendMusic.volume = .5;
        
        var style = { font: "25px Verdana", fill: "#FFFF00", align: "center" };
        var text = game.add.text(0, 0, "DEMO OVER", style);
        var bg = game.add.image(0, -30, 'olympus')
        boss = game.add.image(10, -20, 'zeus');
        boss.scale.setTo(1.9, 1.9);
        game.world.setBounds(-20, -20, game.width+20, game.height+2);
        
        dialogueBox = this.game.add.button(150, 440, "dialogue2", function() {
            this.handler("1a");}, this);
        dialogue = "Welcome to Mt. Olympus,\n home of the gods.\n You've done well Egeiro.";
        dialogueBox.scale.setTo(1.7)
        dialogueString = this.game.add.text(180, 460, "", {font: "25px Arial", fill: "#00FFFF"});
        text = game.add.group();
        text.add(dialogueString);
        
        bg.width = game.width;
	},
    
    update: function() {
        dialogueString.text  = dialogue;
    },
    
    handler: function(o) {
        if (o == "1a") {
            this.dialogue("1b");
        } if (o == "1c") {
            this.dialogue("1c");
        } if (o == "1d") {
            this.dialogue("1d");
        } if (o == "1e") {
            this.dialogue("1e");
        }
    },
    
    dialogue: function(option) {
        if (option == "1b") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(150, 440, "dialogue2", function() {
            this.handler("1c");}, this);
            dialogueBox.scale.setTo(1.7)
            dialogueString = this.game.add.text(180, 460, "", {font: "25px Arial", fill: "#00FFFF"});
            dialogue = "You've had a long journey\nand now you may rest.";
        } else if (option == "1c") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(150, 440, "dialogue2", function() {
            this.handler("1d");}, this);
            dialogueBox.scale.setTo(1.7)
            dialogueString = this.game.add.text(180, 460, "", {font: "25px Arial", fill: "#00FFFF"});
            dialogue = "By choosing to befriend\nthe gods and monsters you\nmet instead of slaying them...";
        } else if (option == "1d") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(150, 440, "dialogue2", function() {
            this.handler("1e");}, this);
            dialogueBox.scale.setTo(1.7)
            dialogueString = this.game.add.text(180, 460, "", {font: "25px Arial", fill: "#00FFFF"});
            dialogue = "...You've become a TRUE HERO.\nWelcome to the\nhome of the gods.";
        } else if (option == "1e") {
            dialogueBox.kill();
            dialogueBox = this.game.add.button(150, 440, "dialogue");
            dialogueBox.scale.setTo(1.7)
            dialogueString = this.game.add.text(180, 460, "", {font: "25px Arial", fill: "##FFFF00"});
            dialogue = "YOU WON THE GAME AND\nBECAME A TRUE HERO. Please\n refresh to play again.";
        }
    },
}     