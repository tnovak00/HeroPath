var map;
var cursors;
var player;
var jumptimer = 0;
var attack;
var attacking = false;
var spikes;
var endDoor;
var goblins;
var skelCol;
var goblinJumpForce = 600;
var goblinJumpCDMin = 0.5;
var goblingJUMPCDMax = 2;
var h1;
var healthBoard;
var bats;
var chest1;
var chest1Opened = false;
var attackCD = 1;
var attackAnimationCD = 0.5;
var attackOnCD = false;
var wow;

// SOUNDS
var castle;
var jump;
var ouch;
var swingsword;
var swordhit;
var treasure;

level3 = {
  	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 3168, 1024);
        
        //Sounds and music
        game.castle = game.add.audio('castle');
        game.castle.volume = .15;
        game.jump = game.add.audio('jump');
        game.ouch = game.add.audio('ouch');
        game.ouch.volume = .30;
        game.swingsword = game.add.audio('swingsword');
        game.swordhit = game.add.audio('swordhit');
        game.treasure = game.add.audio('treasure');
        
        game.castle.play();
        
        //Map and collisions
        map = game.add.tilemap('level3', 32, 32);
        map.addTilesetImage('library_tileset');
        fillLayer = map.createLayer('background_fill');
        backgroundLayer = map.createLayer('background');
        decorLayer = map.createLayer('background_decor');
        platformLayer = map.createLayer('collision_ground');
        
        map.setCollisionBetween(1,19,true,platformLayer);
       
        
        endDoor = game.add.sprite(2680, 580, 'icon');
        endDoor.scale.setTo(.5, 1);
        game.physics.enable(endDoor, Phaser.Physics.ARCADE);
        
        h1 = game.add.sprite(10, 450, 'heart');
        h1.scale.setTo(2, 2);
        healthBoard = this.game.add.text(21, 462, "", {font: "bold 24px Arial", fill: "#000"});
        
        h1.fixedToCamera = true;
        h1.cameraOffset.setTo(0, 0)
        healthBoard.fixedToCamera = true;
        healthBoard.cameraOffset.setTo(11, 12)
        
        //Adding player
        player = game.add.sprite(70, 800, "player");
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.scale.setTo(.15, .15);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 700;
        player.body.maxVelocity.y = 500;
        player.anchor.setTo(.5, .5);
        game.camera.follow(player);
        player.body.setSize(100, 280, -8, 0);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
        
        //Enemies - Goblins
        enemyGoblins = [];
        goblinCoords = [[500, 700],[550, 700],[1500, 700],[2100,700],[2400,800]];
        
        for(i = 0; i < goblinCoords.length; i++){
            enemyGoblins.push(new Goblin(i, game, player, goblinCoords[i][0], goblinCoords[i][1], this));
            game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, enemyGoblins[i].goblin);
        }
        
        goblins = game.add.group();
        goblins.enableBody = true;
        goblins.physicsBodyType = Phaser.Physics.ARCADE;
        var skel1 = goblins.create(500, 700, 'goblin');
        skel1.body.velocity.x = -50;
        skel1.anchor.setTo(.5, .5);
        var skel2 = goblins.create(500, 700, 'goblin');
        skel2.body.velocity.x = -50;
        skel2.anchor.setTo(.5, .5);
        var skel3 = goblins.create(1500, 700, 'goblin');
        skel3.body.velocity.x = -50;
        skel3.anchor.setTo(.5, .5);
        var skel4 = goblins.create(2100, 700, 'goblin');
        skel4.body.velocity.x = -50;
        skel4.anchor.setTo(.5, .5);
        var skel5 = goblins.create(2400, 800, 'goblin');
        skel5.body.velocity.x = -50;
        skel5.anchor.setTo(.5, .5);
        
        goblins.setAll('body.gravity.y', 1000);
        goblins.setAll('body.maxVelocity.y', 500);
        goblins.callAll('animations.add', 'animations', 'walk', [0, 1, 2], 5, true);
        
        skel1.animations.play("walk");
        skel2.animations.play("walk");
        skel3.animations.play("walk");
        skel4.animations.play("walk");
        skel5.animations.play("walk");
       
        
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, skel1);
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, skel2);
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, skel3);
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, skel4);
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, skel5);
        
        endDoor = game.add.sprite(2222, 738, 'icon');
        endDoor.scale.setTo(.5, 1);
        game.physics.enable(endDoor, Phaser.Physics.ARCADE);
        
        //Enemies - Bats
        bats = game.add.group();
        bats.enableBody = true;
        bats.physicsBodyType = Phaser.Physics.ARCADE;
        
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        game.time.events.repeat(Phaser.Timer.SECOND * 1, 100, this.generateBat,this);
        
        
	},
    
    update: function(){
        
        game.physics.arcade.collide(player, platformLayer);
        game.physics.arcade.collide(goblins, platformLayer);
        game.physics.arcade.overlap(player, spikes, this.spikeHit, null, this);
        game.physics.arcade.overlap(player, chest1, this.openChest, null, this);
        game.physics.arcade.overlap(goblins, skelCol, this.skeletonPath, null, this);
        game.physics.arcade.overlap(player, goblins, this.skelHit, null, this);
        game.physics.arcade.overlap(player, bats, this.batHit, null, this);
        game.physics.arcade.overlap(player, endDoor, this.bossFight, null, this)
        
        for(i = 0; i < enemyGoblins.length; i++){
            enemyGoblins[i].update();
        }
        
        healthBoard.text = health;
        
        if (health <= 0) {
            health = 100;
            chest1Opened = false;
            game.castle.stop();
            this.game.state.start(game.state.current);
        }
        
        if (attack.isDown && player.scale.x == .15) {
            player.body.setSize(100, 280, 18, 0);
        }
        if (attack.isDown && player.scale.x == -.15) {
            player.body.setSize(100, 280, -8, 0);
        }
        
        player.body.velocity.x = 0
        //Player movement
        
        if(!attackOnCD && attack.isDown){
            game.time.events.add(Phaser.Timer.SECOND * attackCD, this.attackCooldown, this);
            game.time.events.add(Phaser.Timer.SECOND * attackAnimationCD, this.attackAnimationCooldown, this);
            attackOnCD = true;
            attacking = true;
            player.animations.play('attack');
            if (cursors.right.isDown) {
                player.scale.x = .15;
                player.body.velocity.x = 200;
            } else if (cursors.left.isDown){
                player.body.velocity.x = -200;
                player.scale.x = -.15;
            }
        }
        else {
            if (cursors.right.isDown){
                player.body.velocity.x = 200;
                player.scale.x = .15;
                if(!attacking){
                    player.animations.play('walk');
                    player.body.setSize(100, 280, -8, 0);
                    attacking = false;
                }
            } else if (cursors.left.isDown) {
                player.body.velocity.x = -200;
                player.scale.x = -.15;
                if(!attacking){
                    player.animations.play('walk');
                    player.body.setSize(100, 280, 7, 0);
                    attacking = false;
                }
            } else {
                
                player.body.setSize(100, 280, -8, 0);
                if(!attacking) {
                    player.frame = 0;
                    attacking = false;
                }
            }
        }
        
        if (cursors.up.isDown && player.body.onFloor()) {
            player.body.velocity.y = -400
            game.jump.play();
        }
    },
    
    spikeHit: function() {
        player.position.x = 70;
        player.position.y = 800;
        game.ouch.play();
    },
    
    bossFight: function() {
       this.game.state.start("Level3-2");
    },
    
    skelHit: function(player, skeleton) {
        if (attacking == false) {
            health = health - 2
            game.ouch.play();
        } else {
            game.swordhit.play();
            skeleton.kill();
        }
    },
    
    batHit: function(player, bat) {
        if (attacking == false) {
            health = health - 2
            game.ouch.play();
        } else {
            game.swordhit.play();
            bat.kill();
        }
    },
    
    skeletonPath: function(skeleton, c) {
        skeleton.body.velocity.x *= -1;
        skeleton.scale.x *= -1  
    },
    
    goblinJump: function(goblin){
        if(goblin.body.onFloor()) {
            goblin.body.velocity.y = -goblinJumpForce;
        }
        game.time.events.add(Phaser.Timer.SECOND * game.rnd.realInRange(goblinJumpCDMin,goblingJUMPCDMax), this.goblinJump, this, goblin);
    },
    
    generateBat: function() {
        var x = game.rnd.integerInRange(0, 600);
        var y = game.rnd.integerInRange(1, 100);
        
        if (y % 2 == 0) {
            var x1 = this.game.rnd.integerInRange(player.position.x - 500, player.position.x + 600);
            var x2 = this.game.rnd.integerInRange(player.position.x - 500, player.position.x + 600);
             
            var y1 = this.game.rnd.integerInRange(player.position.y - 500, player.position.y + 500);
            var y2 = this.game.rnd.integerInRange(player.position.y - 500, player.position.y + 500);
            bat = bats.create(player.position.x + 800, 800, 'bat'); 
            bat.animations.add('fly', [0, 1, 2], 13, true);
            
            var w = this.game.width - bat.width;
            var h = this.game.height - bat.height;
            
            batTween = this.game.add.tween(bat).to ({ x: [900, x1, x2, -100], y: [x, y1, y2, x]}, 9000, Phaser.Easing.Quadratic.Out, true).interpolation(function(v, k) { return Phaser.Math.bezierInterpolation(v, k);})
            
            bat.animations.play('fly');
            bat.lifespan = 10000;
        }
    },
    
    openChest: function() {
        if (chest1Opened == false) {
            game.treasure.play();
            chest1.animations.play('open', 7, false);
            chest1Opened = true;
            bone = true;
            
            wow = game.add.sprite(100, 600, 'wow');
            wow.fixedToCamera = true;
            wow.cameraOffset.setTo(200, 200)
            wow.animations.add('spin', [0, 1, 2], 10, true);
            wow.animations.play('spin');
            
            game.time.events.add(Phaser.Timer.SECOND * 4, this.killWow, this);
        }
    },
    
    killWow: function() {
        wow.kill();
    },
        
    attackCooldown: function() {
        attackOnCD = false;
    },
    
    attackAnimationCooldown: function() {
        attacking = false;
    },
    
    render: function(){
        //game.debug.text('Grounded: ' + grounded, 32, 32);
    }
    
}  

Goblin = function (index, game, player, x, y, level) {

    var x = x;
    var y = y;

    this.game = game;
    this.health = 1;
    this.player = player;
    this.alive = true;
    this.faceRight = false;
    this.level = level;
    this.playerRight = false;
    
    this.goblin = game.add.sprite(x, y, 'goblin');
    game.physics.enable(this.goblin, Phaser.Physics.ARCADE);
    this.goblin.name = index.toString();
    this.goblin.body.gravity.y = 1000;
    this.goblin.enableBody = true;
    this.goblin.anchor.setTo(.5, .5);
    this.goblin.body.immovable = true;
    this.goblin.body.collideWorldBounds = true;
    this.goblin.body.allowGravity = true;
    this.goblin.animations.add('walk', [0, 1, 2], 5, true);
    this.goblin.animations.play('walk');
};

Goblin.prototype.update = function() {
    game.physics.arcade.collide(this.goblin, platformLayer);
    game.physics.arcade.overlap(this.goblin, this.player, this.level.skelHit, null, this);
    
    if(this.player.x - this.goblin.x > 0) {
        this.playerRight = true; 
    } else {
        this.playerRight = false; 
    }
    
    if(this.playerRight != this.faceRight) this.flip();
    
    this.goblin.body.velocity.x = 50;
    if(!this.faceRight) this.goblin.body.velocity.x *= -1;

};

Goblin.prototype.flip = function() {
    this.goblin.scale.x *= -1;
    this.faceRight = !this.faceRight;
}