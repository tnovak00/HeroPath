var map;
var layer;
var endDoor2;
var chest2A;
var chest2B;
var chest2C;
var chest2D;
var chest2E;
var goblins;
var goblinsA;
var birds;

level2 = {
  	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
        bg = this.game.add.tileSprite(0, 0, 4900, 1024, 'clouds');
        game.world.setBounds(0, 0, 4900, 1024);
        
        //Sounds and music
        game.castle = game.add.audio('castle');
        game.castle.volume = .15;
        game.jump = game.add.audio('jump');
        game.ouch = game.add.audio('ouch');
        game.ouch.volume = .30;
        game.swingsword = game.add.audio('swingsword');
        game.swordhit = game.add.audio('swordhit');
        game.treasure = game.add.audio('treasure');
        
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud1');
        }
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud2');
        }
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud3');
        }
        for (var i = 0; i < 20; i++) {
            var x = game.rnd.integerInRange(0, 4900)
            var y = game.rnd.integerInRange(0, 1024)
            game.add.image(x, y, 'cloud4');
        }
        
        //Map and collisions
        map = game.add.tilemap('level2');
        map.addTilesetImage('ruinsSet', 'ruinsSet');
        layer = map.createLayer('Tile Layer 1');
        map.setCollisionBetween(1, 2000);
        
        endDoor2 = game.add.sprite(4610, 200, 'door');
        endDoor2.scale.setTo(.5, .5);
        game.physics.enable(endDoor2, Phaser.Physics.ARCADE);
        
        h1 = game.add.sprite(10, 450, 'heart');
        h1.scale.setTo(2, 2);
        healthBoard = this.game.add.text(21, 462, "", {font: "bold 24px Arial", fill: "#000"});
        
        h1.fixedToCamera = true;
        h1.cameraOffset.setTo(0, 0)
        healthBoard.fixedToCamera = true;
        healthBoard.cameraOffset.setTo(11, 12)
        
        //Adding player
        player = game.add.sprite(70, 100, "player");
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.scale.setTo(.15, .15);
        player.body.collideWorldBounds = false;
        player.body.gravity.y = 700;
        player.body.maxVelocity.y = 500;
        player.anchor.setTo(.5, .5);
      //  game.camera.follow(player);
        player.body.setSize(100, 280, -8, 0);
        
        player.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15, 16], 11, true);
        
        var goblin = game.add.sprite(100, 800, 'goblin');
        goblin.animations.add('walk', [0, 1, 2, 3, 4, 5], 10, true);
        goblin.animations.play('walk');
        var goblinA = game.add.sprite(200, 800, 'goblinA');
        goblinA.animations.add('walk', [0, 1, 2, 3, 4, 5], 10, true);
        goblinA.animations.play('walk');
        var bird = game.add.sprite(300, 800, 'bird');
        bird.animations.add('fly', [0, 1, 2], 10, true);
        bird.animations.play('fly');
        
        //Enemies - Goblins
        goblins = game.add.group();
        goblins.enableBody = true;
        goblins.physicsBodyType = Phaser.Physics.ARCADE;
        var gob1 = goblins.create(500, 700, 'goblin');
        gob1.body.velocity.x = -50;
        gob1.anchor.setTo(.5, .5);
        
        goblins.setAll('body.gravity.y', 1000);
        goblins.setAll('body.maxVelocity.y', 500);
        goblins.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3, 4, 5], 5, true);
        
        gob1.animations.play("walk");
       
        gobCol = game.add.group();
        gobCol.enableBody = true;
        gobCol.physicsBodyType = Phaser.Physics.ARCADE;
        
        var col = gobCol.create(390, 300, 'icon');
        col.scale.setTo(.5, .5);
        var col = gobCol.create(570, 300, 'icon');
        col.scale.setTo(.5, .5);
        
        gobCol.setAll('body.immovable', true);
        gobCol.setAll('body.moves', false);
        
        //Enemies - Armored Goblins
        goblinsA = game.add.group();
        goblinsA.enableBody = true;
        goblinsA.physicsBodyType = Phaser.Physics.ARCADE;
        var gobA1 = goblinsA.create(100, 500, 'goblinA')
        
        //Enemies - Bats
        bats = game.add.group();
        bats.enableBody = true;
        bats.physicsBodyType = Phaser.Physics.ARCADE;
        
        cursors = game.input.keyboard.createCursorKeys();
        attack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        chest2A = game.add.sprite(74, 507, 'chest');
        chest2B = game.add.sprite(780, 383, 'chest');
        chest2C = game.add.sprite(1930, 62, 'chest');
        chest2D = game.add.sprite(1985, 315, 'chest');
        chest2E = game.add.sprite(3515, 315, 'chest');
        game.physics.enable(chest2A, Phaser.Physics.ARCADE);
        chest2A.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2A, Phaser.Physics.ARCADE);
        chest2B.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2A, Phaser.Physics.ARCADE);
        chest2C.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2A, Phaser.Physics.ARCADE);
        chest2D.animations.add('open', [0, 1, 2, 3], 10, true);
        game.physics.enable(chest2A, Phaser.Physics.ARCADE);
        chest2E.animations.add('open', [0, 1, 2, 3], 10, true);
        
	},
    
    update: function(){
        
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(goblins, layer);
        game.physics.arcade.overlap(player, chest1, this.openChest, null, this);
        game.physics.arcade.overlap(skeletons, gobCol, this.skeletonPath, null, this);
        game.physics.arcade.overlap(player, goblins, this.skelHit, null, this);
        game.physics.arcade.overlap(player, bats, this.batHit, null, this);
        game.physics.arcade.overlap(player, endDoor2, this.bossFight, null, this);
        
        healthBoard.text = health;
        
        if (player.position.y > 1024) {
            player.position.x = 70;
            player.position.y = 100;
        }
        if (health <= 0) {
            this.game.state.start("LevelSelect");
            health = 100;
        }
        
        if (attack.isDown && player.scale.x == .15) {
            player.body.setSize(100, 280, 18, 0);
        }
        if (attack.isDown && player.scale.x == -.15) {
            player.body.setSize(100, 280, -8, 0);
        }
        
        player.body.velocity.x = 0
        
        if (cursors.up.isDown)
    {
        game.camera.y -= 10;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 10;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 10;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 10;
    }
        //Player movement
//        if (attack.isDown && cursors.right.isDown) {
//            player.animations.play('attack');
//            player.scale.x = .15;
//            player.body.velocity.x = 200;
//            attacking = true;
//        } else if (attack.isDown && cursors.left.isDown){
//            player.body.velocity.x = -200;
//            player.scale.x = -.15;
//            player.animations.play('attack');
//            attacking = true;
//        } else if (cursors.right.isDown){
//            player.body.velocity.x = 200;
//            player.scale.x = .15;
//            player.animations.play('walk');
//            player.body.setSize(100, 280, -8, 0);
//            attacking = false;
//        } else if (cursors.left.isDown){
//            player.body.velocity.x = -200;
//            player.scale.x = -.15;
//            player.animations.play('walk');
//            player.body.setSize(100, 280, 7, 0);
//            attacking = false;
//        } else if (attack.isDown) {
//            attacking = true;
//            player.animations.play('attack');
//        } else {
//            player.frame = 0;
//            player.body.setSize(100, 280, -8, 0);
//            attacking = false;
//        }
//        
//        if (cursors.up.isDown && game.time.now > jumptimer) {
//            player.body.velocity.y = -400
//            game.jump.play();
//            jumptimer = game.time.now + 1000;
//        }
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
    }
}  