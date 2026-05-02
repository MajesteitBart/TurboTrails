import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('results') === '1') {
      this.scene.start('ResultsScene', {
        levelId: 'forest-01-basics',
        levelTitle: 'Forest 01: Basics',
        timeMs: 32100,
        coins: 7,
        totalCoins: 9,
        chests: 1,
        totalChests: 1,
        chestIds: ['chest-1'],
        stars: 2,
        score: 1420,
      });
      return;
    }

    this.scene.start('PreloadScene');
  }
}
