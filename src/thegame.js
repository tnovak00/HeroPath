var theGame = function(game){
}

//Global varibles
var bg;
var gems;
var dragon
var cursors;
var player;
var candy;
var redgems;
var bones;
var heart;
var harder;
var harder2;
var harder3;
var harder4;
var enemyTimer;
var scoreBoard;
var healthBoard;
var Dhealth = 5;
var score = 0;
var boneTween;
var bullets;
var bulletTime = 0
var guns;

//Sound effects
var ow;
var sparkle;
var growl;
var yay;
var kidmusic;
var dragonmusic;
var bonesM;
var burn;

theGame.prototype = {
  	create: function(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
     ow = this.game.add.audio('ow');
     sparkle = this.game.add.audio('sparkle');
     growl = this.game.add.audio('growl');
     yay = this.game.add.audio('yay');
     bonesM = this.game.add.audio('bones');
     burn = this.game.add.audio('burn');
     kidmusic = this.game.add.audio('kidmusic');
     dragonmusic = this.game.add.audio('dragonmusic');
     dragonmusic.loop = true;
     kidmusic.loop = true;
        
    players = this.game.add.group();
    players.enableBody = true;
    players.physicsBodyType = Phaser.Physics.ARCADE;
        
    obstacles = this.game.add.group();
    obstacles.enableBody = true;
    obstacles.physicsBodyType = Phaser.Physics.ARCADE;
        
    //Kid mode
    if (dragonmode == false) {
        bg = this.game.add.tileSprite(0, 0, 900, 650, 'background');
        
        kidmusic.loop = true;
        kidmusic.play();
        
        //Health and scoreboards
        this.game.add.image(600, 0, 'scoreKid');
        scoreBoard = this.game.add.text(800, 30, "", {font: "bold 40px Arial", fill: "#000"});
        
        heart = this.game.add.image(15, 25, 'heart');
        heart.scale.set(.42, .42);
        healthBoard = this.game.add.text(42, 34, "", {font: "bold 35px Arial", fill: "#fff"});
        
        player = players.create(70, 100, 'player');
        player.animations.add('move', [0, 1, 2, 3], 13, true);
        player.animations.play('move');
        player.scale.set(3, 3);
        player.body.collideWorldBounds = true;
        player.body.setSize(38, 20, 0, 70);
        
        candy = this.game.add.group();
        candy.enableBody = true;
        candy.physicsBodyType = Phaser.Physics.ARCADE;
        
        guns = this.game.add.group();
        guns.enableBody = true;
        guns.physicsBodyType = Phaser.Physics.ARCADE;
        
        gems = this.game.add.group();
        gems.enableBody = true;
        gems.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, this.generateCandy, this);
        
        enemyTimer  = this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 100, this.generateObstacles, this);
        this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 100, this.generateGun,this);
        this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 100, this.generateGem,this);
        
        this.game.world.bringToTop(candy);
        this.game.world.bringToTop(gems)
    }
        
    //Dragon mode
    if (dragonmode == true) {
        bg = this.game.add.tileSprite(0, 0, 900, 650, 'sky');
        
        dragonmusic.loop = true;
        dragonmusic.play();
        
        this.game.add.image(600, 0, 'scoreDra');
        scoreBoard = this.game.add.text(800, 30, "", {font: "bold 40px Arial", fill: "#fff"});
        
        heart = this.game.add.image(15, 25, 'heart');
        heart.scale.set(.42, .42);
        healthBoard = this.game.add.text(42, 34, "", {font: "bold 35px Arial", fill: "#fff"});
        
        redgems = this.game.add.group();
        redgems.enableBody = true;
        redgems.physicsBodyType = Phaser.Physics.ARCADE;
        
        //Creating bullets
        bullets = this.game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
        for (var i = 0; i < 20; i++)
        {
            var b = bullets.create(0, 0, 'fire');
            b.animations.add('shoot', [0, 1], 10, true);
            b.scale.set(2, 2);
            b.name = 'bullet' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }
        
        player = players.create(200, 400, 'dragon');
        player.animations.add('shoot', [0, 1 , 2, 3], 10, true);
        player.animations.add('move', [4, 5, 6, 7], 10, true);
        player.animations.play('move');
        player.body.collideWorldBounds = true;
        player.scale.set(3, 3);
        
        enemyTimer  = this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 100, this.generateObstacles, this);
        this.game.time.events.repeat(Phaser.Timer.SECOND * 4, 100, this.generateRed, this);
        
        this.game.world.bringToTop(redgems);
        
    }
    
    this.game.world.bringToTop(obstacles);
    this.game.world.bringToTop(players);
    
    cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    },
    
    update: function() {
        
        this.game.physics.arcade.overlap(players, gems, this.collectGem, null, this);
        this.game.physics.arcade.overlap(players, guns, this.collectGun, null, this);
        this.game.physics.arcade.overlap(players, candy, this.collectCandy, null, this);
        this.game.physics.arcade.overlap(players, obstacles, this.obstacle, null, this);
        this.game.physics.arcade.overlap(players, redgems, this.collectRed, null, this);
        this.game.physics.arcade.overlap(bullets, obstacles, this.killCbstacle, null, this);
        
        if (score >= 100 && harder == false) {
            this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, this.generateObstacles, this);
            harder = true;
        }
        if (score >= 300 && harder2 == false) {
            this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 100, this.generateObstacles, this);
            harder2 = true;
        }
        if (score >= 500 && harder3 == false) {
            this.game.time.events.repeat(Phaser.Timer.SECOND * .5, 100, this.generateObstacles, this);
            harder3 = true;
        }
        if (score >= 700 && harder4 == false) {
            this.game.time.events.repeat(Phaser.Timer.SECOND * .25, 100, this.generateObstacles, this);
            harder4 = true;
        }
        
        if (Khealth == 0) {
            Khealth = 5;
            kidmusic.stop();
            this.game.state.start("GameOver");
        }
        
        if (Dhealth == 0) {
            Dhealth = 5;
            dragonmusic.stop();
            dragonmode = false;
            dragonShoot = false;
            this.game.state.start("TheGame");
        }
        
        if (dragonmode == false) {
            healthBoard.text = Khealth;
        } else  {
            healthBoard.text = Dhealth;
        }
        
        scoreBoard.text = score;
        
        //Moving background
        bg.tilePosition.x -= 4;

        //Controls
        if (dragonmode == false) {
            if (cursors.up.isDown && player.position.y > 40) {
                player.position.y += -5;
            
            } else if (cursors.down.isDown) {
                player.position.y += 5;
       
            }
            if (cursors.right.isDown) {
                player.position.x += 5;
            
            }
            if (cursors.left.isDown) {
                player.position.x += -5;
            }
        }
        
        if (dragonmode == true) {
            if (cursors.up.isDown) {
                player.position.y += -5;
            
            } else if (cursors.down.isDown) {
                player.position.y += 5;
       
            }
            if (cursors.right.isDown) {
                player.position.x += 5;
            
            }
            if (cursors.left.isDown) {
                player.position.x += -5;
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                if (dragonShoot == true) {
                    this.fireBullet();
                }
            }
        }
        
        
    },
    
    collectCandy: function(player, candy) {
        
        candy.kill();
        score += 10;
        yay.play();
        
    },
    
    collectRed: function(player, redgem) {
        
        redgem.kill();
        sparkle.play();
        score += 30;
        
    },
    
    collectGem: function(player, gem) {
        
        dragonmode = true;
        kidmusic.stop();
        bluegem.kill();
        this.game.state.start("TheGame");
        
    },
    
    collectGun: function(player, gun) {
        
        dragonShoot = true;
        gun.kill();
        
    },
    
    killCbstacle: function(bullet, obstacle) {
        
        obstacle.kill();
        this.resetBullet(bullet);
        score += 10;
    },
    
    obstacle: function(player, obstacle) {
        
        obstacle.kill();
        if (dragonmode == false) {
            ow.play();
            Khealth--;
        } else {
            growl.play();
            Dhealth--;
        }
    },
    
    generateCandy: function() {
    
    var x = this.game.rnd.integerInRange(150, 650);
        
    c = candy.create(1000, x, 'candy');
    c.lifespan = 10000
    c.body.velocity.x = -300;
    c.body.immovable = true;
    c.anchor.setTo(.5, .5);
    c.scale.set(.75, .75);
    
    },
    
    generateGun: function() {
    
    var x = this.game.rnd.integerInRange(150, 650);
        
    g = guns.create(1000, x, 'gun');
    g.lifespan = 10000
    g.body.velocity.x = -300;
    g.body.immovable = true;
    g.anchor.setTo(.5, .5);
    g.scale.set(.25, .25);
        
    },
    
    generateObstacles: function() {

    var y = this.game.rnd.integerInRange(1, 100);
    var z = this.game.rnd.integerInRange(1, 3);
    
    if (dragonmode == false) {
        var x = this.game.rnd.integerInRange(150, 650);
        if (y % 2 == 0) {
            o = obstacles.create(900, x, 'cone');
            o.lifespan = 10000
            o.body.velocity.x = -300;
            o.body.immovable = true;
            o.anchor.setTo(.5, .5);
            o.scale.set(.75, .75);
        } else {
            o = obstacles.create(900, x, 'dog');
            o.animations.add('move', [0, 1, 2], 10, true);
            o.animations.play('move');
            o.lifespan = 10000
            o.body.velocity.x = -450;
            o.body.immovable = true;
            o.anchor.setTo(.5, .5);
            o.scale.set(-3, 3)
        }
    } else {
         var x = this.game.rnd.integerInRange(0, 600);
         if (y % 2 == 0) {
             
            var x1 = this.game.rnd.integerInRange(100, 600);
            var x2 = this.game.rnd.integerInRange(100, 600);
             
            var y1 = this.game.rnd.integerInRange(100, 600);
            var y2 = this.game.rnd.integerInRange(100, 600);
             
            o = obstacles.create(900, x, 'bone');
            o.animations.add('move', [0, 1, 2, 3, 4], 10, true);
             
            var w = this.game.width - o.width;
            var h = this.game.height - o.height;
             
            boneTween = this.game.add.tween(o).to ({ x: [900, x1, x2, -100], y: [x, y1, y2, x]}, 3000, Phaser.Easing.Quadratic.Out, true).interpolation(function(v, k) { return Phaser.Math.bezierInterpolation(v, k);})
             
            bonesM.play();
            o.animations.play('move');
            o.lifespan = 10000
            o.body.immovable = true;
            o.anchor.setTo(.5, .5);
            o.scale.set(2, 2);
         } else {
             if (z == 1) {
                 o = obstacles.create(900, x, 'a1');
                o.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
                o.animations.play('move');
                o.lifespan = 10000
                o.body.velocity.x = -300;
                o.body.immovable = true;
                o.anchor.setTo(.5, .5);
             } else if (z == 2) {
                o = obstacles.create(1000, x, 'a2');
                o.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
                o.animations.play('move');
                o.lifespan = 10000
                o.body.velocity.x = -300;
                o.body.immovable = true;
                o.anchor.setTo(.5, .5);
             } else if (z == 3) {
                o = obstacles.create(900, x, 'a3');
                o.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
                o.animations.play('move');
                o.lifespan = 10000
                o.body.velocity.x = -300;
                o.body.immovable = true;
                o.anchor.setTo(.5, .5);
             }
         }
    }
  },
    generateGem: function() {
    
    var x = this.game.rnd.integerInRange(150, 650);
    var y = this.game.rnd.integerInRange(1, 100);
    
    if (y % 2 == 0) {    
    bluegem = gems.create(1100, x, 'bluegem');
    bluegem.animations.add('sparkle', [0, 1, 2, 3], 10, true);
    bluegem.animations.play('sparkle');
    bluegem.lifespan = 10000
    bluegem.body.velocity.x = -300;
    bluegem.body.immovable = true;
    bluegem.anchor.setTo(.5, .5);
    bluegem.scale.set(2, 2);
    }
  },
    
    generateRed: function() {
    
    var x = this.game.rnd.integerInRange(150, 650);
        
    r = redgems.create(1000, x, 'redgem');
    r.body.setSize(38, 30, 5, 10);
    r.animations.add('sparkle', [0, 1, 2, 3], 10, true);
    r.scale.set(2, 2);
    r.animations.play('sparkle');
    r.lifespan = 10000
    r.body.velocity.x = -300;
    r.body.immovable = true;
        
    },
    
    fireBullet: function() {
    
    if (this.game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);
        if (bullet) {
        bullet.reset(player.x + 130, player.y + 45);
        bullet.animations.play('shoot');
        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.stopShoot, this);

        burn.play();
        player.animations.play('shoot');
        bullet.body.velocity.x = 600;
        bulletTime = this.game.time.now + 150;
        }
      }
    },
    
    resetBullet: function(bullet) {

    bullet.kill();

    },
    
    stopShoot: function() {
        player.animations.stop('shoot');
        player.animations.play('move');
    }
} 