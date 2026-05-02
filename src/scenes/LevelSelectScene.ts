import Phaser from 'phaser';
import { levels } from '../data/levels';
import { worlds } from '../data/worlds';
import { GAME_HEIGHT, GAME_WIDTH } from '../game/constants';
import { SaveManager } from '../systems/SaveManager';

interface LevelSelectPayload {
  worldId?: string;
}

export class LevelSelectScene extends Phaser.Scene {
  private worldId = 'forest';

  constructor() {
    super('LevelSelectScene');
  }

  init(payload: LevelSelectPayload): void {
    this.worldId = payload.worldId ?? 'forest';
  }

  create(): void {
    const world = worlds.find((entry) => entry.id === this.worldId) ?? worlds[0];
    const saveGame = new SaveManager().load();
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x12364a);
    this.add.rectangle(GAME_WIDTH / 2, 610, GAME_WIDTH, 220, 0x21794f);
    this.add.text(72, 62, world.title, {
      fontFamily: 'Arial',
      fontSize: '56px',
      color: '#f8fafc',
      fontStyle: 'bold',
    });
    this.add.text(76, 132, 'Select a level', {
      fontFamily: 'Arial',
      fontSize: '26px',
      color: '#d9f99d',
    });

    world.levelIds.forEach((levelId, index) => {
      const level = levels[levelId];
      const record = saveGame.levelRecords[levelId];
      const x = 84 + index * 330;
      const y = 230;
      const card = this.add
        .rectangle(x, y, 288, 170, 0x2f6f57, 0.98)
        .setOrigin(0, 0)
        .setStrokeStyle(3, 0xf8fafc, 0.55)
        .setInteractive({ useHandCursor: true });
      this.add.text(x + 22, y + 24, level.title, {
        fontFamily: 'Arial',
        fontSize: '26px',
        color: '#f8fafc',
        fontStyle: 'bold',
      });
      this.add.text(x + 22, y + 78, 'Coins, chest, checkpoint, finish.', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#e5e7eb',
        wordWrap: { width: 240 },
      });
      this.add.text(x + 22, y + 126, record?.completed ? `Done ${record.stars}/3 stars` : 'Play', {
        fontFamily: 'Arial',
        fontSize: record?.completed ? '18px' : '22px',
        color: '#facc15',
        fontStyle: 'bold',
      });
      if (record?.bestTimeMs !== undefined) {
        this.add.text(x + 172, y + 126, `${(record.bestTimeMs / 1000).toFixed(1)}s`, {
          fontFamily: 'Arial',
          fontSize: '18px',
          color: '#d9f99d',
          fontStyle: 'bold',
        });
      }
      card.on('pointerup', () => this.scene.start('GameScene', { levelId }));
    });

    if (world.levelIds.length === 0) {
      this.add.text(84, 236, 'No levels yet.', {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#e5e7eb',
      });
    }

    this.createButton(72, 550, 'Back', () => this.scene.start('WorldSelectScene'));
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
