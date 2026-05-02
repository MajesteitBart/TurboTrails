import { Engine } from '@babylonjs/core/Legacy/legacy';
import { WarehouseLevel } from '../levels/WarehouseLevel';
import { KeyboardInput } from '../ui/KeyboardInput';
import { TouchControls } from '../ui/TouchControls';
import { GameHud } from '../ui/GameHud';
import { createInputState } from '../ui/PlayerInputState';
import { GameStateReporter } from './state';

export class TurboTrailsApp {
  private readonly canvas = document.createElement('canvas');
  private readonly input = createInputState();
  private readonly keyboard = new KeyboardInput(this.input);
  private readonly hud: GameHud;
  private readonly touch: TouchControls;
  private engine?: Engine;
  private level?: WarehouseLevel;

  constructor(private readonly root: HTMLElement) {
    this.canvas.id = 'game-canvas';
    this.canvas.setAttribute('aria-label', 'TurboTrails 3D playable game');
    this.hud = new GameHud(root);
    this.touch = new TouchControls(root, this.input);
  }

  async start(): Promise<void> {
    this.root.innerHTML = '';
    this.root.append(this.canvas);
    this.hud.mount();
    this.touch.mount();
    this.keyboard.bind();

    this.engine = new Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true,
    });
    this.level = new WarehouseLevel(this.engine, this.canvas, this.input, this.hud);
    await this.level.load();

    this.engine.runRenderLoop(() => {
      this.level?.update(this.engine?.getDeltaTime() ?? 16.67);
    });

    window.addEventListener('resize', () => this.engine?.resize());
    GameStateReporter.set({ ready: true, scene: 'WarehouseLevel', status: 'playing' });
  }
}
