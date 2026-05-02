import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../game/constants';
import type { LevelResults } from '../types/Results';

export class ResultsScene extends Phaser.Scene {
  private results?: LevelResults;

  constructor() {
    super('ResultsScene');
  }

  init(results: LevelResults): void {
    this.results = results;
  }

  create(): void {
    const results = this.results;
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x12364a);
    this.add.rectangle(GAME_WIDTH / 2, 574, GAME_WIDTH, 292, 0x21794f);
    this.add.circle(1030, 132, 62, 0xffd166);

    this.add.text(80, 76, 'Level Complete', {
      fontFamily: 'Arial',
      fontSize: '58px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });

    if (!results) {
      this.add.text(84, 170, 'No results were provided.', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#fecaca',
      });
      return;
    }

    this.add.text(84, 158, results.levelTitle, {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#d9f99d',
    });

    this.add.text(84, 230, `${'★'.repeat(results.stars)}${'☆'.repeat(3 - results.stars)}`, {
      fontFamily: 'Arial',
      fontSize: '58px',
      color: '#facc15',
    });

    const seconds = (results.timeMs / 1000).toFixed(1);
    const lines = [
      `Time: ${seconds}s`,
      `Coins: ${results.coins}/${results.totalCoins}`,
      `Chests: ${results.chests}/${results.totalChests}`,
      `Score: ${results.score}`,
    ];

    this.add.text(88, 326, lines.join('\n'), {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#f8fafc',
      lineSpacing: 12,
    });

    this.createButton(84, 548, 'Retry', () => this.scene.start('GameScene'));
    this.createButton(260, 548, 'Menu', () => this.scene.start('LevelSelectScene', { worldId: 'forest' }));
  }

  private createButton(x: number, y: number, label: string, onClick: () => void): void {
    const text = this.add
      .text(x, y, label, {
        fontFamily: 'Arial',
        fontSize: '30px',
        color: '#0f172a',
        backgroundColor: '#facc15',
        padding: { left: 24, right: 24, top: 12, bottom: 12 },
      })
      .setInteractive({ useHandCursor: true });

    text.on('pointerup', onClick);
  }
}
