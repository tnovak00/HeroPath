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
        
        if (cursors.up.isDown && game.time.now > jumptimer) {
            player.body.velocity.y = -400
            game.jump.play();
            jumptimer = game.time.now + 1000;
        }
    },
    
    spikeHit: function() {
        player.position.x = 70;
        player.position.y = 800;
        game.ouch.play();
    },
    
    bossFight: function() {
       this.game.state.start("Level1-2");
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
        goblin.body.velocity.y = 400;
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
    }
    
}  

