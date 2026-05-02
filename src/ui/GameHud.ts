export class GameHud {
  private readonly hud = document.createElement('div');
  private readonly message = document.createElement('div');
  private readonly progressFill = document.createElement('div');

  constructor(private readonly root: HTMLElement) {}

  mount(): void {
    this.hud.className = 'hud';
    this.hud.innerHTML = `
      <div class="hud-row">
        <div class="hud-stat"><span>TIME</span><strong data-time>0.0</strong></div>
        <div class="hud-stat"><span>COINS</span><strong data-coins>0</strong></div>
        <div class="hud-stat"><span>EXP</span><strong data-exp>0</strong></div>
      </div>
      <div class="progress"><div></div></div>
    `;
    this.message.className = 'stunt-message';
    this.progressFill.className = 'progress-fill';
    this.hud.querySelector('.progress')?.replaceChildren(this.progressFill);
    this.root.append(this.hud, this.message);
  }

  update(time: number, coins: number, exp: number, progress: number): void {
    this.hud.querySelector('[data-time]')!.textContent = time.toFixed(1);
    this.hud.querySelector('[data-coins]')!.textContent = String(coins);
    this.hud.querySelector('[data-exp]')!.textContent = String(exp);
    this.progressFill.style.width = `${Math.round(progress * 100)}%`;
  }

  flash(text: string): void {
    this.message.textContent = text;
    this.message.classList.remove('show');
    window.setTimeout(() => this.message.classList.add('show'), 20);
  }
}
