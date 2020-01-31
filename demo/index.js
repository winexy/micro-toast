import { toast } from '../dist/index.js';

button.onclick = function () {
  toast(`test`, { duration: 3000, index: 'test' });
  toast(`no-index`, { duration: 3000, });
  toast(`no-duration`, { duration: 0, index: 'kek' });
}