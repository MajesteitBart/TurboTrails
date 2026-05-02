import Phaser from 'phaser';
import { worlds } from '../data/worlds';
import { GAME_HEIGHT, GAME_WIDTH } from '../game/constants';

export class WorldSelectScene extends Phaser.Scene {
  constructor() {
    super('WorldSelectScene');
  }

  create(): void {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x12364a);
    this.add.rectangle(GAME_WIDTH / 2, 610, GAME_WIDTH, 220, 0x21794f);
    this.add.text(72, 62, 'Choose World', {
      fontFamily: 'Arial',
      fontSize: '56px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });

    worlds.forEach((world, index) => {
      const x = 105 + index * 386;
      const y = 190;
      const available = world.status === 'available';
      const card = this.add
        .rectangle(x, y, 330, 250, world.color, available ? 0.96 : 0.46)
        .setOrigin(0, 0)
        .setStrokeStyle(3, available ? 0xf8fafc : 0x94a3b8, 0.55);

      this.add.text(x + 24, y + 28, world.title, {
        fontFamily: 'Arial',
        fontSize: '30px',
        color: '#f8fafc',
        fontStyle: 'bold',
        wordWrap: { width: 280 },
      });
      this.add.text(x + 24, y + 86, world.subtitle, {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#e5e7eb',
        wordWrap: { width: 270 },
      });
      this.add.text(x + 24, y + 182, available ? 'Open' : 'Coming soon', {
        fontFamily: 'Arial',
        fontSize: '22px',
        color: available ? '#facc15' : '#cbd5e1',
        fontStyle: 'bold',
      });

      if (available) {
        card.setInteractive({ useHandCursor: true });
        card.on('pointerup', () => this.scene.start('LevelSelectScene', { worldId: world.id }));
      }
    });

    this.createButton(72, 550, 'Back', () => this.scene.start('MainMenuScene'));
  }

  private createButton(x: number, y: number, label: string, onClick: () => void): void {
    const button = this.add
      .text(x, y, label, {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#0f172a',
        backgroundColor: '#facc15',
        padding: { left: 22, right: 22, top: 10, bottom: 10 },
      })
      .setInteractive({ useHandCursor: true });
    button.on('pointerup', onClick);
  }
}
