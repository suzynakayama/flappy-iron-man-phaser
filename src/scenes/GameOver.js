import Phaser from 'phaser';

let graphics, cursors;

class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }
  // initialize() {
  //   Phaser.Scene.call(this, { key: "gameOver" });
  // }

  create() {
    cursors = this.input.keyboard.createCursorKeys()

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 620, 480);

    this.add.text(170, 220, "You Lost! Press Space to Restart.");
  }

  update() {
    if (cursors.space.isDown) this.scene.start('menu')
  }
}

export default GameOver