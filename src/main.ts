import { TurboTrailsApp } from './app/TurboTrailsApp';
import './styles.css';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('Missing #app root');
}

new TurboTrailsApp(root).start();
