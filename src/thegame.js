var theGame = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
}

var win = false;
var lose = false;
var player;
var facing = 'left';
var cursors;  
var shootButton;
var bg;
var jumpTimer = 0
var music;
var text;
var scoreboard;
var lives = 10;
var winMusic;
var homeBase;
var enemyBase;
var c1;
var c2;
var c3
var c4; 
var c5;
var c6;
var c7;
var c8;
var c9;
var c10;
var c11;
var c12;
var c13;
var c14;
var c15;
var c16;
var c17;
var c18;

//
var map;
var layer;
var playerApple;
var enemyApple;
var appleOn = false;
var base
var capture = 0;
var eBunny;
var animationRunning = false; 
var eBunnyPathA;
var eBunnyPathB;
var ePath = 'A';
var eApple = 'false';
var EcollisionLG;

//Sounds
var growl;
var yay;
var sparkleSFX;
var alert;
var party;

theGame.prototype = {
  	create: function(){
    
    this. game.physics.startSystem(Phaser.Physics.ARCADE);
     
    bg = this.game.add.tileSprite(0, 0, 900, 650, 'background');
     
    //Creating map and collisions with tilemap
    map = this.game.add.tilemap('tilemap', 32, 32);
    map.addTilesetImage('jungle'); 
    layer = map.createLayer(0); 
    map.setCollisionBetween(140, 142);
    map.setCollisionBetween(215, 216);
    map.setCollisionBetween(219, 221);
    map.setCollisionBetween(227, 229);
    map.setCollisionBetween(189, 190);
    map.setCollisionBetween(231, 233);
    map.setCollisionBetween(196, 198);
    map.setCollisionBetween(393, 396);
    map.setCollisionBetween(252, 253);
    map.setCollisionBetween(31, 33);
    map.setCollisionBetween(309, 310); 
    map.setCollisionBetween(161, 162); 
    map.setCollisionBetween(87, 89)
    map.setCollisionBetween(28, 30)
    map.setCollision(154);
    map.setCollision(97);
    map.setCollision(98);
    map.setCollision(42);
    map.setCollision(210);
    map.setCollision(308);
     
    //Life counter
    scoreboard = this.game.add.text(600, 18, "Score: ", {font: "bold 20px Arial", fill: "#fff"});
    
    //Sound Effects
    growl = this.game.add.audio('growl');
    sparkleSFX = this.game.add.audio('sparkleSFX');
    yay = this.game.add.audio('yay');
    winMusic = this.game.add.audio('winMusic');
    music = this.game.add.audio('music');
    alert = this.game.add.audio('alert');
    party = this.game.add.audio('party');
    party.volume = .50;
    alert.volume = .50;
    music.volume = .10;
    growl.volume = .50;
    sparkleSFX.volume = .50;
    yay.volume = .50;
    party.volume = .50;
    music.loop = true;
    music.play();
    
    collisions = this.game.add.group();
    collisions.enableBody = true;
    collisions.physicsBodyType = Phaser.Physics.ARCADE;
    
    Ecollisions = this.game.add.group();
    Ecollisions.enableBody = true;
    Ecollisions.physicsBodyType = Phaser.Physics.ARCADE;
   
    c1 = Ecollisions.create(80, 580, 'Ecollision');
    c2 = Ecollisions.create(20, 530, 'Ecollision');
    c3 = Ecollisions.create(150, 460, 'Ecollision');
    c4 = Ecollisions.create(10, 390, 'Ecollision');
    c5 = Ecollisions.create(20, 530, 'Ecollision');
    c6 = Ecollisions.create(140, 330, 'Ecollision');
    c7 = Ecollisions.create(300, 370, 'Ecollision');
    c8 = Ecollisions.create(460, 370, 'Ecollision');
    c9 = Ecollisions.create(520, 300, 'Ecollision');
    c10 = Ecollisions.create(610, 260, 'Ecollision');
    c11 = Ecollisions.create(720, 200, 'Ecollision');
    c12 = Ecollisions.create(600, 100, 'Ecollision');
    c13 = Ecollisions.create(220, 100, 'Ecollision');
    c14 = Ecollisions.create(370, 380, 'Ecollision');
    c15 = Ecollisions.create(200, 370, 'Ecollision');
    c16 = Ecollisions.create(170, 580, 'Ecollision');
    c17 = Ecollisions.create(670, 550, 'Ecollision');
 //   c18 = Ecollisions.create(77, 475, 'Ecollision');
    
    EcollisionLG = this.game.add.sprite(740, 476, 'EcollisionLG');
    
    homeBase = this.game.add.sprite(50, 70, 'base');
    this.game.physics.enable(homeBase, Phaser.Physics.ARCADE);
    homeBase.body.immovable = true;
    homeBase.body.moves = false;
    
    enemyBase = this.game.add.sprite(810, 455, 'base');
    this.game.physics.enable(enemyBase, Phaser.Physics.ARCADE);
    enemyBase.body.immovable = true;
    enemyBase.body.moves = false;
    
    //Creating enemies
    enemiesR = this.game.add.group();
    enemiesR.enableBody = true;
    enemiesR.physicsBodyType = Phaser.Physics.ARCADE;
    
    enemiesJ = this.game.add.group();
    enemiesJ.enableBody = true;
    enemiesJ.physicsBodyType = Phaser.Physics.ARCADE;
    
    var enemy1 = enemiesR.create(340, 50, 'enemyBunny');
    c = collisions.create(210, 100, 'collision');
    c = collisions.create(500, 100, 'collision');
    enemy1.body.velocity.x = -150; 
    enemy1.anchor.setTo(.5, .5);
    
    var enemy2 = enemiesR.create(700, -30, 'enemyBunny');
    var enemy5 = enemiesR.create(30, 540, 'enemyBunny');
    enemy5.anchor.setTo(.5, .5);
    enemy5.scale.x = -1;
    
    var enemy3 = enemiesJ.create(435, 200, 'enemyBunny');
    c = collisions.create(450, 375, 'collision');
    enemy3.body.setSize(30, 30)
    
    var enemy6 = enemiesJ.create(160, 200, 'enemyBunny');
    c = collisions.create(160, 330, 'collision');
    enemy6.body.setSize(30, 30)
    
    var enemy4 = enemiesR.create(550, 500, 'enemyBunny');
    c = collisions.create(600, 550, 'collision');
    c = collisions.create(300, 550, 'collision');
    enemy4.body.velocity.x = -150; 
    enemy4.anchor.setTo(.5, .5);
    
    Ecollisions.setAll('body.immovable', true);
    Ecollisions.setAll('body.moves', false);
    collisions.setAll('body.immovable', true);
    collisions.setAll('body.moves', false);
    enemiesR.callAll('animations.add', 'animations', 'move', [0, 1, 2, 3], 9, true);
    enemiesR.setAll('body.gravity.y', 1000);
    enemiesR.setAll('body.maxVelocity.y', 500);
    enemiesJ.callAll('animations.add', 'animations', 'move', [0, 1, 2, 3], 9, true);
    enemiesJ.setAll('body.gravity.y', 400);
    enemiesJ.setAll('body.maxVelocity.y', 500);
    
    enemy1.animations.play('move');
    enemy4.animations.play('move');
    
    this.game.physics.arcade.gravity.y = 300;
    
    player = this.game.add.sprite(10, 30, 'playerBunny');
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(.5, .5);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 1000;
    player.body.maxVelocity.y = 500;
    player.body.setSize(45, 30)

    player.animations.add('move', [4, 1, 2, 3], 9, true); 
    player.animations.add('jump', [3, 5], 9, true); 
    
    //Golden apples
    playerApple = this.game.add.sprite(50, 70, 'appleSparkle');
    playerApple.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6], 10, true);
    playerApple.animations.play('sparkle');
    this.game.physics.enable(playerApple, Phaser.Physics.ARCADE);
    playerApple.body.immovable = true;
    playerApple.body.moves = false;
    
    enemyApple = this.game.add.sprite(810, 455, 'appleSparkle');
    enemyApple.animations.add('sparkle', [0, 1, 2, 3, 4, 5, 6], 10, true);
    enemyApple.animations.play('sparkle');
    this.game.physics.enable(enemyApple, Phaser.Physics.ARCADE);
    enemyApple.body.immovable = true;
    enemyApple.body.moves = false;
    
    eBunny = this.game.add.sprite(808, 410, 'oppBunny');
    eBunny.animations.add('move', [0, 1, 2, 3], 9, true);
    this.game.physics.enable(eBunny, Phaser.Physics.ARCADE);
    eBunny.anchor.setTo(.5, .5);
    eBunny.body.collideWorldBounds = true;
    eBunny.body.gravity.y = 1000;
    eBunny.body.maxVelocity.y = 500;
    eBunny.body.setSize(45, 30);

    
    cursors = this.game.input.keyboard.createCursorKeys();
 
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    },
    
    update: function() {
    
    this.game.physics.arcade.collide(player, layer);
    this.game.physics.arcade.collide(enemiesR, layer);
    this.game.physics.arcade.collide(enemiesJ, layer);
    this.game.physics.arcade.collide(eBunny, layer);
    this.game.physics.arcade.overlap(enemiesR, collisions, this.turnR, null, this);
    this.game.physics.arcade.overlap(player, eBunny, this.resetPlayerA, null, this);
    this.game.physics.arcade.overlap(enemiesJ, collisions, this.turnJ, null, this);
    this.game.physics.arcade.overlap(player, enemyApple, this.pickUp, null, this);
    this.game.physics.arcade.overlap(player, enemiesJ, this.loseApple, null, this);
    this.game.physics.arcade.overlap(player, enemiesR, this.loseApple, null, this);
    this.game.physics.arcade.overlap(player, homeBase, this.captureApple, null, this);
    this.game.physics.arcade.overlap(eBunny, enemyBase, this.EcaptureApple, null, this);
        
    if(eBunny.body.velocity == 0) {
        eBunny.position.x == 808
        eBunny.position.y == 455
        eBunny.body.velocity.x = -100
    }
    
    if (eBunny.position.x == 808 && eBunny.position.y == 455) {
        eBunny.body.velocity.x = -100;
        ePath == 'A';
        eBunny.animations.play('move');
    }
    
    if(this.checkOverlap(eBunny, playerApple)) {
        eBunny.body.velocity.x = 100;
        ePath = 'B';
        eApple = true;
        alert.play();
        playerApple.position.x = -50;
        this.turn();
    }
    
    if (this.checkOverlap(eBunny, c1) && ePath == 'A') {
        eBunny.body.velocity.y = -3000;
        eBunny.body.velocity.x = -270;
        eBunny.scale.x = 1;
    }
    
    if (this.checkOverlap(eBunny, c2) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 400;
        eBunny.body.gravity.y = 500;
        eBunny.scale.x = -1;
    } if (this.checkOverlap(eBunny, c2) && ePath == 'B') {
        this.turn();
        eBunny.body.velocity.x = 150;
        eBunny.scale.x = -1;
    }
    
    if (this.checkOverlap(eBunny, c3) && ePath == 'A') {
        eBunny.body.velocity.y = -3000;
        eBunny.body.velocity.x = -250;
        eBunny.scale.x = 1;
    } else if (this.checkOverlap(eBunny, c3) && ePath == 'B') {
        eBunny.scale.x = 1;
        eBunny.body.velocity.x = -150;
    }
    
    if (this.checkOverlap(eBunny, c4) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 150;
        eBunny.scale.x = -1;
    } else if (this.checkOverlap(eBunny, c4) && ePath == 'B') {
        eBunny.body.velocity.x = 150;  
        eBunny.scale.x = -1;
    }
    
    if (this.checkOverlap(eBunny, c7) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 150;
    }
    
    if (this.checkOverlap(eBunny, c8) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 150;
    }
    
    if (this.checkOverlap(eBunny, c9) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 100;
    }
    
    if (this.checkOverlap(eBunny, c10) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 250;
        eBunny.scale.x = -1;
    }
    if (this.checkOverlap(eBunny, c14) && ePath == 'B') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = -100;
    }
    if (this.checkOverlap(eBunny, c15) && ePath == 'B') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = -100;
    }
    if (this.checkOverlap(eBunny, c11) && ePath == 'A') {
        eBunny.body.velocity.y = -500;
        eBunny.body.velocity.x = -100;
        eBunny.body.gravity.y = 500;
        eBunny.scale.x = 1;
    } else if (this.checkOverlap(eBunny, c11) && ePath == 'B') {
        eBunny.scale.x = 1;
        eBunny.body.velocity.x = -100;
    }
    
    if (this.checkOverlap(eBunny, c12) && ePath == 'A') {
        eBunny.body.velocity.x = -150;
    }
    
    if (this.checkOverlap(eBunny, c13) && ePath == 'A') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = -250;
    }
    
    if (this.checkOverlap(eBunny, c16) && ePath == 'B') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 150;
    }
    
    if (this.checkOverlap(eBunny, c17) && ePath == 'B') {
        eBunny.body.velocity.y = -2000;
        eBunny.body.velocity.x = 150;
    }
    if (this.checkOverlap(eBunny, EcollisionLG)) {
        eBunny.body.velocity.x = -150;
        eBunny.animations.play('move');
    }
//     if (this.checkOverlap(eBunny, c18)) {
//        eBunny.body.velocity.x = 300;
//    }
    
    scoreboard.text = "Score: " + capture;

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;

        if (facing != 'left')
        {
            player.scale.x = 1;
            player.animations.play('move');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;

        if (facing != 'right')
        {
            player.scale.x = -1
            player.animations.play('move');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

        }
    }
    
    if (cursors.up.isDown && this.game.time.now > jumpTimer)
    {
        player.body.velocity.y = -4000;
        jumpTimer = this.game.time.now + 800;
        player.animations.play('jump');
        facing = 'idle';
    }
    
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    }

}, 

resetPlayerA: function() {
    if (eApple == true) {
        party.play();
        eApple = false;
        playerApple.position.x = 50;
        ePath = 'A';
        eBunny.position.x = -150;
        eBunny.position.x = 808;
        eBunny.position.y = 430;
        eBunny.scale.x = 1;
    }
},

turn: function() {
    
    eBunny.scale.x *= -1;
},

pickUp: function(player, enemyApple) {
    
    sparkleSFX.play();
    appleOn = true;
    enemyApple.position.x = 1000;
    
 },

captureApple: function(player, homeBase) {
    
    if (appleOn == true) {
        yay.play();
        appleOn = false;
        enemyApple.position.x = 810;
        capture += 1;
    }
 },

EcaptureApple: function(eBunny, enemyBase) {
    
    if (eApple == true) {
        this.youLose();
    }
 },

loseApple: function(player, enemy) {
    
    if (appleOn == true) {
        appleOn = false;
        enemyApple.position.x = 810;
        growl.play();
    }
    
 },

turnJ: function(enemy, collision) {

    enemy.body.velocity.y = -4000;
 },
    
turnR: function(enemy, collision) {
    
    enemy.body.velocity.y == 0;
    enemy.body.velocity.x *= -1;
    enemy.scale.x *= -1;
 },

youLose: function() {
    
    appleOn = 'false';
    music.stop();
    eApple = false;
    ePath = 'A'; this.game.state.start("GameOver",true,false,capture);	

},

checkOverlap: function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
}