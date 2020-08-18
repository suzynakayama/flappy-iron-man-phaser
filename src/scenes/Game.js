import Phaser from 'phaser';
import { gameOptions } from '../utils/gameOptions';
import sky from '../assets/sky.png';
import ironMan from '../assets/ironMan.png';
import hulk from '../assets/hulk.png';

class Game extends Phaser.Scene {
  constructor() {
    super("game");
    window.game = this
  }
  // initialize() {
  //   Phaser.Scene.call(this, { key: "game" });
  //   window.GAME = this;
  // }

  preload() {
    // load images
    this.load.image("ironMan", ironMan);
    this.load.image("hulk", hulk);
    this.load.image("sky", sky);
  }

  create() {
    this.add.image(400, 300, "sky");

    this.hulkGroups = this.physics.add.group();
    this.hulkPool = [];
    for (let i = 0; i < 4; i++) {
      this.hulkPool.push(this.hulkGroups.create(0, 0, "hulk"));
      this.hulkPool.push(this.hulkGroups.create(0, 0, "hulk"));
      this.placeHulks(false);
    }

    this.hulkGroups.setVelocityX(-gameOptions.ironManSpeed);

    this.ironMan = this.physics.add.sprite(80, game.game.config.height / 2, "ironMan");
    this.ironMan.setScale(0.07)
    this.ironMan.body.gravity.y = gameOptions.ironManGravity;

    this.input.on("pointerdown", this.flap, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.topScore = localStorage.getItem(gameOptions.localStorageName) || 0;
    this.scoreText = this.add.text(10, 10, "");
    this.updateScore(this.score);
  }

  updateScore(inc) {
    this.score += inc;
    this.scoreText.text = `Score: ${this.score} \nBest: ${this.topScore}`;
  }

  placeHulks(addScore) {
    let rightMost = this.getRightMostHulk();
    const hulkHoleHeight = Phaser.Math.Between(
      gameOptions.hulkHole[0],
      gameOptions.hulkHole[1]
    );
    const hulkHolePosition = Phaser.Math.Between(
      gameOptions.minHulkHeight + hulkHoleHeight / 2,
      game.game.config.height - gameOptions.minHulkHeight - hulkHoleHeight / 2
    );
    this.hulkPool[0].x =
      rightMost +
      this.hulkPool[0].getBounds().width +
      Phaser.Math.Between(
        gameOptions.hulkDistance[0],
        gameOptions.hulkDistance[1]
      );
    this.hulkPool[0].y = hulkHolePosition - hulkHoleHeight / 2;
    this.hulkPool[0].flipY=true;
    this.hulkPool[0].setScale(0.3);
    this.hulkPool[0].setOrigin(0, 1);
    this.hulkPool[1].x = this.hulkPool[0].x;
    this.hulkPool[1].y = hulkHolePosition + hulkHoleHeight / 2;
    this.hulkPool[1].setScale(0.3);
    this.hulkPool[1].setOrigin(0, 0);
    this.hulkPool = [];
    if (addScore) this.updateScore(1);
  }

  flap() {
    this.ironMan.body.velocity.y = -gameOptions.ironManFlapPower;
  }

  getRightMostHulk() {
    let rightMostHulk = 0;
    this.hulkGroups
      .getChildren()
      .forEach((hulk) => (rightMostHulk = Math.max(rightMostHulk, hulk.x)));
    return rightMostHulk;
  }

  update() {
    if (this.cursors.space.isDown) this.flap();

    this.physics.world.collide(this.ironMan, this.hulkGroups, this.die, null, this);

    if (this.ironMan.y > game.game.config.height || this.ironMan.y < 0) this.die();

    this.hulkGroups.getChildren().forEach((hulk) => {
      if (hulk.getBounds().right < 0) {
        this.hulkPool.push(hulk);
        if (this.hulkPool.length === 2) this.placeHulks(true);
      }
    }, this);
  }

  die() {
    localStorage.setItem(
      gameOptions.localStorageName,
      Math.max(this.score, this.topScore)
    );
    // this.scene.start("game");
    this.gameOver = true;
    if (this.gameOver) this.scene.start('gameOver')
  }
}

export default Game