//var dragon = function(game){
//}
//
////Global varibles
//var kid;
//var dragon;
//var bg;
//var bluegem;
//var cursors;
//
//theGame.prototype = {
//  	create: function(){
//        
//    this.game.physics.startSystem(Phaser.Physics.ARCADE);
//    
//    bg = this.game.add.tileSprite(0, 0, 900, 650, 'sky');
//        
//    dragon = this.game.add.sprite(200, 400, 'dragon');
//    dragon.animations.add('shoot', [0, 1 , 2, 3], 10, true);
//    dragon.animations.add('move', [4, 5, 6, 7], 10, true);
//    dragon.animations.play('shoot');
//    dragon.scale.set(3, 3);
//        
//    items = this.game.add.group();
//    items.enableBody = true;
//    items.physicsBodyType = Phaser.Physics.ARCADE;
//        
//    bluegem = items.create(300, 400, 'bluegem');
//    bluegem.animations.add('sparkle', [0, 1, 2, 3], 10, true);
//    bluegem.animations.play('sparkle');
//    bluegem.scale.set(2, 2);
//    
//    cursors = this.game.input.keyboard.createCursorKeys();
//    },
//    
//    update: function() {
//        
//        this.game.physics.arcade.overlap(kid, items, this.collect, null, this);
//        
//        //Moving background
//        bg.tilePosition.x -= 4;
//
//        //Controls
//        if (cursors.up.isDown && kid.position.y > 40) {
//            kid.position.y += -5;
//            
//        } else if (cursors.down.isDown) {
//            kid.position.y += 5;
//       
//        }
//        if (cursors.right.isDown) {
//            kid.position.x += 5;
//            
//        }
//        if (cursors.left.isDown) {
//            kid.position.x += -5;
//        }
//        
//    },
//    
//    collect: function(kid, item) {
//        
//        if (item == bluegem) {
//            bluegem.kill();
//        }
//    }
//    
//    
////    render: function() {
////
////    this.game.debug.body(kid);
////    this.game.debug.body(border);
////
////    }
//} 