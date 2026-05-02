import Phaser from 'phaser';
import { vehicles } from '../data/vehicles';
import { GAME_HEIGHT, GAME_WIDTH } from '../game/constants';

export class GarageScene extends Phaser.Scene {
  constructor() {
    super('GarageScene');
  }

  create(): void {
    const vehicle = vehicles[0];
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x12364a);
    this.add.rectangle(GAME_WIDTH / 2, 610, GAME_WIDTH, 220, 0x21794f);
    this.add.text(72, 62, 'Garage', {
      fontFamily: 'Arial',
      fontSize: '56px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });
    this.add.text(76, 132, 'First vehicle unlocked', {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#d9f99d',
    });

    this.add.rectangle(370, 350, 420, 230, 0x1e293b, 0.92).setStrokeStyle(3, 0xf8fafc, 0.4);
    this.add.text(206, 260, vehicle.displayName, {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });
    this.add.rectangle(370, 374, 210, 48, 0xfacc15).setRotation(-0.12);
    this.add.circle(296, 414, 28, 0x111827);
    this.add.circle(448, 394, 28, 0x111827);
    this.add.circle(296, 414, 14, 0xe5e7eb);
    this.add.circle(448, 394, 14, 0xe5e7eb);
    this.add.text(206, 458, 'Balanced starter bike for Forest Trails.', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#e5e7eb',
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
