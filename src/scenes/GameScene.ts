import Phaser from 'phaser';
import { levels, type LevelId } from '../data/levels';
import { vehicles } from '../data/vehicles';
import { GAME_HEIGHT, isDebugEnabled } from '../game/constants';
import { calculateScore, calculateStars } from '../systems/ScoreSystem';
import { createBikeContactState, type BikeContactState } from '../systems/BikeContact';
import {
  applyBikeInput,
  updateBikeContactFromProbe,
  type BikeMotionBody,
} from '../systems/BikeMovement';
import { InputController } from '../systems/InputController';
import {
  calculateLevelProgress,
  countObjects,
  createLevelRuntimeState,
  type LevelRuntimeState,
} from '../systems/LevelState';
import type { CheckpointDefinition, LevelDefinition } from '../types/LevelDefinition';
import type { VehicleConfig } from '../types/VehicleConfig';

interface CollectibleView {
  id: string;
  type: 'coin' | 'chest';
  x: number;
  y: number;
  collected: boolean;
  view: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Visible;
}

interface GameScenePayload {
  levelId?: LevelId;
}

export class GameScene extends Phaser.Scene {
  private inputController!: InputController;
  private bike!: Phaser.Physics.Matter.Image;
  private bikeVisual!: Phaser.GameObjects.Container;
  private hudText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private progressFill!: Phaser.GameObjects.Rectangle;
  private level: LevelDefinition = levels['forest-01-basics'];
  private readonly vehicle: VehicleConfig = vehicles[0];
  private levelState: LevelRuntimeState = createLevelRuntimeState();
  private bikeContact: BikeContactState = createBikeContactState();
  private collectibles: CollectibleView[] = [];
  private coins = 0;
  private chests = 0;
  private startedAt = 0;
  private checkpointX = this.level.start.x;
  private checkpointY = this.level.start.y;
  private finishTransitionQueued = false;

  constructor() {
    super('GameScene');
  }

  init(payload: GameScenePayload): void {
    this.level = levels[payload.levelId ?? 'forest-01-basics'];
  }

  create(): void {
    this.startedAt = this.time.now;
    this.levelState = createLevelRuntimeState();
    this.bikeContact = createBikeContactState(this.time.now);
    this.collectibles = [];
    this.coins = 0;
    this.chests = 0;
    this.checkpointX = this.level.start.x;
    this.checkpointY = this.level.start.y;
    this.finishTransitionQueued = false;

    this.matter.world.setBounds(0, 0, this.level.bounds.width, this.level.bounds.height);
    this.matter.world.setGravity(0, 1);

    this.createBackdrop();
    this.createTerrain();
    this.createObjects();
    this.createBike();
    this.inputController = new InputController(this);
    this.createHud();
    this.createTouchOverlay();

    this.cameras.main.startFollow(this.bike, true, 0.09, 0.08, -240, 80);
    this.cameras.main.setBounds(0, 0, this.level.bounds.width, this.level.bounds.height);
  }

  update(): void {
    const state = this.inputController.getState();
    const body = this.bike.body as BikeMotionBody;
    this.updateBikeContact(body);

    if (!this.levelState.finishReached) {
      applyBikeInput(this.bike, body, state, this.vehicle, this.bikeContact, this.time.now);
    }

    if (state.restartPressed || this.bike.y > GAME_HEIGHT + 120) {
      this.resetBike();
    }

    this.updateBikeVisual();
    this.updateCollectibles();
    this.updateCheckpointAndFinish();
    this.updateHud(body);
    this.inputController.afterUpdate();
  }

  private createBackdrop(): void {
    this.add.rectangle(1575, 360, 3150, 720, 0x12364a);
    this.add.rectangle(1575, 252, 3150, 250, 0x1e5b66).setAlpha(0.55);
    this.add.circle(1040, 128, 58, 0xffd166);

    for (let x = -100; x < 3300; x += 420) {
      this.add.circle(x, 442, 118, 0x2f6f57).setAlpha(0.62);
      this.add.circle(x + 120, 420, 92, 0x3f8f59).setAlpha(0.55);
    }

    for (let x = 80; x < 3200; x += 310) {
      this.add.rectangle(x, 526, 34, 170, 0x5b3a29);
      this.add.circle(x - 36, 406, 76, 0x2e7d4f);
      this.add.circle(x + 34, 406, 84, 0x276447);
      this.add.circle(x, 358, 72, 0x3d9460);
    }

    this.add.rectangle(1575, 632, 3150, 176, 0x21794f);
    this.add.rectangle(1575, 698, 3150, 48, 0x463126);
    this.add.rectangle(1575, 664, 3150, 22, 0x6b4a32).setAlpha(0.65);
  }

  private createTerrain(): void {
    this.level.terrain.forEach((segment) => {
      this.addTrackSegment(segment.x, segment.y, segment.width, segment.height, segment.rotation, 0x8b6b3f);
    });

    this.matter.add.rectangle(1575, 650, 3150, 80, { isStatic: true, friction: 0.95 });
  }

  private addTrackSegment(x: number, y: number, width: number, height: number, angle: number, color: number): void {
    this.add.rectangle(x, y + 12, width, height, 0x4b3428).setRotation(angle);
    this.add.rectangle(x, y, width, height, color).setRotation(angle);
    this.matter.add.rectangle(x, y, width, height, { isStatic: true, angle, friction: 0.95, restitution: 0.02 });
  }

  private createObjects(): void {
    this.level.objects.forEach((object) => {
      if (object.type === 'coin') {
        const coin = this.add.circle(object.x, object.y, 15, 0xfacc15);
        this.add.circle(object.x, object.y, 8, 0xfff7ad);
        this.collectibles.push({ ...object, collected: false, view: coin });
        return;
      }

      const chest = this.add.container(object.x, object.y, [
        this.add.rectangle(0, 8, 52, 34, 0x8b4513),
        this.add.rectangle(0, -8, 54, 18, 0xd97706),
        this.add.rectangle(0, 8, 10, 36, 0xfacc15),
        this.add.rectangle(0, 0, 58, 4, 0xfacc15),
      ]);
      this.collectibles.push({ ...object, collected: false, view: chest });
    });

    this.level.checkpoints.forEach((checkpoint) => this.createCheckpoint(checkpoint));
    this.add.rectangle(this.level.finish.x, this.level.finish.y, 20, this.level.finish.height, 0xf8fafc);
    this.add.rectangle(this.level.finish.x + 42, this.level.finish.y - 64, 72, 52, 0xef4444);
    this.add.text(this.level.finish.x - 42, this.level.finish.y + 79, 'FINISH', {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#f8fafc',
    });
  }

  private createCheckpoint(checkpoint: CheckpointDefinition): void {
    this.add.rectangle(checkpoint.x, checkpoint.y, 20, 120, 0x22c55e);
    this.add.triangle(
      checkpoint.x + 34,
      checkpoint.y - 54,
      checkpoint.x,
      checkpoint.y - 78,
      checkpoint.x,
      checkpoint.y - 30,
      checkpoint.x + 72,
      checkpoint.y - 54,
      0x86efac,
    );
    this.add.text(checkpoint.x - 50, checkpoint.y + 70, 'CHECKPOINT', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#dcfce7',
    });
  }

  private createBike(): void {
    this.bike = this.matter.add.image(this.level.start.x, this.level.start.y, '', undefined, {
      shape: {
        type: 'rectangle',
        width: this.vehicle.body.chassisWidth + 12,
        height: this.vehicle.body.chassisHeight + 4,
      },
      friction: 0.72,
      restitution: 0.04,
    });
    this.bike.setVisible(false);
    this.bike.setRotation(this.level.start.rotation);

    this.bikeVisual = this.add.container(this.bike.x, this.bike.y);
    this.bikeVisual.add([
      this.add.circle(-42, 18, 18, 0x111827),
      this.add.circle(42, 18, 18, 0x111827),
      this.add.circle(-42, 18, 9, 0xe5e7eb),
      this.add.circle(42, 18, 9, 0xe5e7eb),
      this.add.rectangle(0, 2, 92, 24, 0xfacc15).setRotation(-0.08),
      this.add.rectangle(12, -18, 38, 32, 0xef4444).setRotation(-0.08),
      this.add.circle(34, -42, 13, 0xfde68a),
      this.add.rectangle(12, -30, 20, 36, 0x2563eb).setRotation(0.2),
      this.add.rectangle(60, -10, 30, 6, 0x111827).setRotation(-0.35),
    ]);
  }

  private createHud(): void {
    this.add.rectangle(640, 36, 1280, 72, 0x0f172a, 0.74).setScrollFactor(0);
    this.add.rectangle(354, 36, 360, 14, 0x334155, 0.95).setScrollFactor(0);
    this.progressFill = this.add.rectangle(174, 36, 1, 14, 0x84cc16).setOrigin(0, 0.5).setScrollFactor(0);
    this.hudText = this.add
      .text(34, 18, '', { fontFamily: 'Arial', fontSize: '20px', color: '#f8fafc' })
      .setScrollFactor(0);
    this.statusText = this.add
      .text(545, 18, `${this.level.title} - collect the chest and hit the finish`, {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: '#fde68a',
      })
      .setScrollFactor(0);
  }

  private createTouchOverlay(): void {
    this.createControlButton(92, 620, 'BACK', 'tiltBack');
    this.createControlButton(184, 620, 'FWD', 'tiltForward');
    this.createControlButton(276, 620, 'JUMP', 'jumpHeld');
    this.createControlButton(1084, 610, 'GAS', 'throttle', 78);
    this.createControlButton(1200, 630, 'BRAKE', 'brake', 58);
  }

  private createControlButton(
    x: number,
    y: number,
    label: string,
    action: 'throttle' | 'brake' | 'tiltBack' | 'tiltForward' | 'jumpHeld',
    radius = 54,
  ): void {
    const button = this.add
      .circle(x, y, radius, 0xf8fafc, 0.18)
      .setStrokeStyle(3, 0xf8fafc, 0.5)
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true });
    const text = this.add
      .text(x, y, label, {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#f8fafc',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setScrollFactor(0);

    const setActive = (active: boolean): void => {
      this.inputController.setTouchControl(action, active);
      button.setFillStyle(0xf8fafc, active ? 0.34 : 0.18);
    };

    button.on('pointerdown', () => setActive(true));
    button.on('pointerup', () => setActive(false));
    button.on('pointerout', () => setActive(false));
    button.on('pointercancel', () => setActive(false));
    text.setInteractive({ useHandCursor: true });
    text.on('pointerdown', () => setActive(true));
    text.on('pointerup', () => setActive(false));
  }

  private updateBikeVisual(): void {
    this.bikeVisual.setPosition(this.bike.x, this.bike.y);
    this.bikeVisual.setRotation(this.bike.rotation);
  }

  private updateBikeContact(body: BikeMotionBody): void {
    const nearestTrackY =
      this.level.terrain.reduce((nearest, segment) => {
        if (Math.abs(this.bike.x - segment.x) > segment.width / 2 + 80) {
          return nearest;
        }

        const topY = segment.y - segment.height / 2 - this.vehicle.body.chassisHeight / 2;
        return Math.abs(topY - this.bike.y) < Math.abs(nearest - this.bike.y) ? topY : nearest;
      }, 612) - 4;

    updateBikeContactFromProbe(this.bike, this.bikeContact, this.time.now, nearestTrackY);

    if (this.bikeContact.grounded && Math.abs(body.angularVelocity) > 0.18) {
      this.bike.setAngularVelocity(body.angularVelocity * 0.94);
    }
  }

  private updateCollectibles(): void {
    this.collectibles.forEach((collectible) => {
      if (collectible.collected) {
        return;
      }

      const distance = Phaser.Math.Distance.Between(this.bike.x, this.bike.y, collectible.x, collectible.y);
      if (distance < 58) {
        collectible.collected = true;
        this.levelState.collectedObjectIds.add(collectible.id);
        collectible.view.setVisible(false);
        if (collectible.type === 'coin') {
          this.coins += 1;
          this.statusText.setText('COIN +10');
        } else {
          this.chests += 1;
          this.statusText.setText('CHEST FOUND!');
        }
      }
    });
  }

  private updateCheckpointAndFinish(): void {
    const nextCheckpoint = this.level.checkpoints.find(
      (checkpoint) => this.bike.x > checkpoint.x && this.levelState.activeCheckpointId !== checkpoint.id,
    );
    if (nextCheckpoint) {
      this.levelState.activeCheckpointId = nextCheckpoint.id;
      this.checkpointX = nextCheckpoint.respawnX;
      this.checkpointY = nextCheckpoint.respawnY;
      this.statusText.setText('CHECKPOINT!');
    }

    if (!this.levelState.finishReached && this.bike.x > this.level.finish.x - this.level.finish.width / 2) {
      this.levelState.finishReached = true;
      this.statusText.setText('FINISH! First playable route complete.');
      this.bike.setVelocity(0, 0);
      this.queueResultsTransition();
    }
  }

  private queueResultsTransition(): void {
    if (this.finishTransitionQueued) {
      return;
    }

    this.finishTransitionQueued = true;
    const timeMs = Math.max(0, Math.floor(this.time.now - this.startedAt));
    const scoreInput = {
      finished: true,
      timeMs,
      targetTimes: this.level.targetTimes,
      coins: this.coins,
      chests: this.chests,
      stuntExp: 0,
      crashed: false,
    };

    this.time.delayedCall(900, () => {
      this.scene.start('ResultsScene', {
        levelId: this.level.id,
        levelTitle: this.level.title,
        timeMs,
        coins: this.coins,
        totalCoins: countObjects(this.level, 'coin'),
        chests: this.chests,
        totalChests: countObjects(this.level, 'chest'),
        chestIds: this.collectibles
          .filter((collectible) => collectible.type === 'chest' && collectible.collected)
          .map((collectible) => collectible.id),
        stars: calculateStars(scoreInput),
        score: calculateScore(scoreInput),
      });
    });
  }

  private updateHud(body: BikeMotionBody): void {
    const elapsedSeconds = Math.max(0, Math.floor((this.time.now - this.startedAt) / 1000));
    const progress = calculateLevelProgress(this.level, this.bike.x);
    this.progressFill.width = 360 * progress;
    this.hudText.setText(
      `TIME ${elapsedSeconds}s   COINS ${this.coins}/${countObjects(this.level, 'coin')}   CHESTS ${this.chests}/${countObjects(this.level, 'chest')}`,
    );

    if (isDebugEnabled()) {
      this.statusText.setText(
        `debug speed=${body.speed.toFixed(2)} grounded=${this.bikeContact.grounded} x=${Math.round(this.bike.x)} y=${Math.round(this.bike.y)}`,
      );
    }
  }

  private resetBike(): void {
    this.bike.setPosition(this.checkpointX, this.checkpointY);
    this.bike.setVelocity(0, 0);
    this.bike.setAngularVelocity(0);
    this.bike.setRotation(this.level.start.rotation);
    this.bikeContact = createBikeContactState(this.time.now);
    this.levelState.finishReached = false;
    this.finishTransitionQueued = false;
    this.statusText.setText('Restarted from checkpoint');
  }
}
