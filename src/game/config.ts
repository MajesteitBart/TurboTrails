import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from './constants';
import { BootScene } from '../scenes/BootScene';
import { GarageScene } from '../scenes/GarageScene';
import { GameScene } from '../scenes/GameScene';
import { LevelSelectScene } from '../scenes/LevelSelectScene';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { ResultsScene } from '../scenes/ResultsScene';
import { WorldSelectScene } from '../scenes/WorldSelectScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#18202f',
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 1 },
      debug: import.meta.env.DEV && new URLSearchParams(window.location.search).get('debug') === '1',
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, PreloadScene, MainMenuScene, WorldSelectScene, LevelSelectScene, GarageScene, GameScene, ResultsScene],
};
