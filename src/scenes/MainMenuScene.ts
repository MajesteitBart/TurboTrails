import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../game/constants';
import { setTestState } from '../game/testState';

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create(): void {
    setTestState({ scene: 'MainMenuScene' });
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x153547);
    this.add.rectangle(GAME_WIDTH / 2, 560, GAME_WIDTH, 330, 0x2b744f);
    this.add.circle(145, 395, 95, 0x3f8f59);
    this.add.circle(360, 360, 130, 0x2f6f57);
    this.add.circle(950, 385, 110, 0x3f8f59);
    this.add.circle(1140, 355, 145, 0x2f6f57);

    this.add.text(76, 70, 'Turbo Trails 2.0', {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });
    this.add.text(80, 150, 'Forest Trails first playable', {
      fontFamily: 'Arial',
      fontSize: '28px',
      color: '#d9f99d',
    });
    this.add.text(82, 198, 'Coins, chests, ramps, checkpoints, and stunt practice.', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#e5e7eb',
    });

    this.createButton(82, 292, 'Play', () => this.scene.start('WorldSelectScene'));
    this.createButton(82, 376, 'Garage', () => this.scene.start('GarageScene'));

    this.add.rectangle(780, 468, 260, 54, 0xfacc15).setRotation(-0.16);
    this.add.circle(705, 502, 26, 0x111827);
    this.add.circle(860, 478, 26, 0x111827);
    this.add.circle(705, 502, 14, 0xe5e7eb);
    this.add.circle(860, 478, 14, 0xe5e7eb);
    this.add.rectangle(780, 430, 72, 42, 0xef4444).setRotation(-0.16);
  }

  private createButton(x: number, y: number, label: string, onClick: () => void): void {
    const button = this.add
      .text(x, y, label, {
        fontFamily: 'Arial',
        fontSize: '34px',
        color: '#0f172a',
        backgroundColor: '#facc15',
        padding: { left: 24, right: 24, top: 12, bottom: 12 },
      })
      .setInteractive({ useHandCursor: true });

    button.on('pointerup', onClick);
  }
}
