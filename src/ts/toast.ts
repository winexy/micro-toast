import { IConfig, IToast } from './interfaces';
import { normalizeConfig, createElement } from './utils';

export function toast(text: string): void;
export function toast(config: IConfig): void;

export function toast(config: IConfig | string): void {
  const _config = normalizeConfig(config);
  const container = createContainerIfNeeded();
  const toast = createToast(container, _config);
  const { duration = 3000 } = _config;

  appendToast(container, toast.el);

  if (duration) {
    setTimeout(function () {
      removeToast(container, toast.el);
    }, duration);
  }
}

function removeToast(container: Element, toast: Element): void {
  toast.classList.add('--remove');
  toast.addEventListener(
    'transitionend', 
    () => container.removeChild(toast), 
    { once: true }
  );
}

function appendToast(container: Element, toast: Element) {
  toast.classList.add('--appear');
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('--appear');
  });
}

function createContainerIfNeeded(): Element {
  let container = document.querySelector('.toast-container');

  if (!container) {
    container = createElement('div');
    container.classList.add('toast-container');
    document.body.appendChild(container);
  }

  return container;
}

function createToast(container: Element, config: IConfig): IToast {
  const classes = config.classes || [];
  const el = createElement('div');
  const content = createElement('p');

  content.classList.add('toast__content');
  content.innerHTML = config.html;
  
  el.classList.add('toast', ...classes);
  el.setAttribute('role', 'alert');
  el.appendChild(content);

  const toast: IToast = {
    el,
    dismiss() {
      removeToast(container, el);
    }
  }

  el.appendChild(createDismissButton(toast));

  return toast;
}

function createDismissButton(toast: IToast): Element {
  const container = createElement('div');
  const btn = createElement('button');

  container.appendChild(btn);
  btn.classList.add('toast__dismiss');
  btn.textContent = '×';
  btn.addEventListener('click', function () {
    toast.dismiss();
  }, { once: true });

  return container;
}