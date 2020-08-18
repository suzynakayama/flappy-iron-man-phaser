import Phaser from 'phaser';
import Menu from './scenes/Menu';
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";

const gameConfig = {
  type: Phaser.AUTO,
    width: 620,
    height: 480,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  pixelArt: true,
  scene: [Menu, Game, GameOver],
};

const game = new Phaser.Game(gameConfig);