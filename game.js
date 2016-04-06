var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");

game.global = {
	thumbRows : 5,
	// number of thumbnail cololumns
	thumbCols : 4,
	// width of a thumbnail, in pixels
	thumbWidth : 64,
	// height of a thumbnail, in pixels
	thumbHeight : 64,
	// space among thumbnails, in pixels
	thumbSpacing : 8,
	// array with finished levels and stars collected.
	// 0 = playable yet unfinished level
	// 1, 2, 3 = level finished with 1, 2, 3 stars
	// 4 = locked
	starsArray : [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
	// level currently playing
	level : 0
}

// game states

game.state.add("Loading", loading);
game.state.add("LevelSelect", levelSelect);
game.state.add("PlayLevel", playLevel);
game.state.add("GameMenu", gameMenu);
game.state.add("Level1-2", level12);
game.state.add("Controls", controls);
game.state.add("GameOver", gameover);

// we'll start loading
game.state.start("Loading");