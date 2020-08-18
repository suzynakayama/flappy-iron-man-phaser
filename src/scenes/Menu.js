import Phaser from 'phaser';

let graphics, cursors;

class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  // initialize() {
  //   Phaser.Scene.call(this, { key: "menu" });
  // }

  create() {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 620, 480);

    this.add.text(200, 210, "Press Space to Start.");
    this.add.text(180, 240, "Use Space or Click to fly.");
  }

  update() {
    if (cursors.space.isDown) {
      this.scene.start("game");
    }
  }
}

export default Menu