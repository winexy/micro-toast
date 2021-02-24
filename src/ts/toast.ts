import { IConfig, IToast } from './interfaces';
import { createElement, withDefaultConfigs } from './utils';

const indexes: Record<string, boolean> = {};

export function toast(text: string, _config: IConfig = {}): void {
  const config = withDefaultConfigs(_config);
  const container = createContainerIfNeeded();
  const toast = createToast(container, text, config);

  const { index } = config;

  if (index !== '' && indexes.hasOwnProperty(index)) {
    return;
  }

  if (index) {
    indexes[index] = true;
  }

  appendToast(container, toast.el);

  if (config.duration) {
    setTimeout(function () {
      removeToast(container, toast.el);
      delete indexes[config.index];
    }, config.duration);
  }
}

export function clearToastContainer() {
  const container = document.querySelector('.toast-container');

  if (!container) {
    return
  }

  Object.keys(indexes).forEach(k => delete indexes[k]);

  Array.from(container.children).forEach(el => {
    removeToast(container, el);
  });  
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

function createToast(container: Element, text: string, config: Required<IConfig>): IToast {
  const el = createElement('div');
  const content = createElement('div');

  content.innerHTML = text;
  
  el.classList.add('toast', ...config.classes);
  el.setAttribute('role', 'alert');
  el.appendChild(content);

  const toast: IToast = {
    el,
    dismiss() {
      removeToast(container, el);
      delete indexes[config.index];
    }
  }

  el.appendChild(createDismissButton(toast));

  return toast;
}

function createDismissButton(toast: IToast): Element {
  const btn = createElement('button');

  btn.classList.add('toast__dismiss');
  btn.textContent = '×';
  btn.addEventListener('click', function () {
    toast.dismiss();
  }, { once: true });

  return btn;
}