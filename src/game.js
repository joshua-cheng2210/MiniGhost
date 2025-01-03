// import Phaser from 'phaser';

// Create our only scene called mainScene, in the game.js file
class mainScene {
    preload() {
      // This method is called once at the beginning
      // It will load all the assets, like sprites and sounds  

      // Parameters: name of the sprite, path of the image
        this.load.image('player', './assets/PlayerGhost.png');
        this.load.image('coin', './assets/coins.webp');
    }
    create() {
      // This method is called once, just after preload()
      // It will initialize our scene, like the positions of the sprites

      // Parameters: x position, y position, name of the sprite
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setScale(0.04);
        this.coin = this.physics.add.sprite(300, 300, 'coin');
        this.coin.setScale(0.01);

        // Store the score in a variable, initialized at 0
        this.score = 0;

        // The style of the text 
        // A lot of options are available, these are the most important ones
        let style = { font: '20px Arial', fill: '#fff' };

        // Display the score in the top left corner
        // Parameters: x position, y position, text, style
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        this.arrow = this.input.keyboard.createCursorKeys();

        // Set world bounds
        this.physics.world.setBounds(0, 0, this.sys.game.config.width, this.sys.game.config.height);

        // Constrain the player to the world bounds
        this.player.setCollideWorldBounds(true);
    }
    update() {
      // This method is called 60 times per second after create() 
      // It will handle all the game's logic, like movements

      // If the player is overlapping with the coin
        if (this.physics.overlap(this.player, this.coin)) {
            // Call the new hit() method
            this.hit();
        }

      // Handle horizontal movements
        if (this.arrow.right.isDown) {
            // If the right arrow is pressed, move to the right
            this.player.x += 3;
        } else if (this.arrow.left.isDown) {
            // If the left arrow is pressed, move to the left
            this.player.x -= 3;
        } 
        
        // Do the same for vertical movements
        if (this.arrow.down.isDown) {
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        } 
    }
    hit() {
        // Disable the coin temporarily
        this.coin.disableBody(true, true);

        // Change the position x and y of the coin randomly
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);
        
        // Increment the score by 10
        this.score += 10;
        
        // Display the updated score on the screen
        this.scoreText.setText('score: ' + this.score);
        
        // Create a new tween 
        this.tweens.add({ // this is just an animation
            targets: this.player, // on the player 
            duration: 200, // for 200ms 
            scaleX: 0.048, // that scale vertically by 20% 
            scaleY: 0.048, // and scale horizontally by 20% 
            yoyo: true, // at the end, go back to original scale 
        });

        // this.player.setScale(1.1);
        // this.coin.setScale(1);
        
        // Re-enable the coin
        this.coin.enableBody(true, this.coin.x, this.coin.y, true, true);
    }
}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});