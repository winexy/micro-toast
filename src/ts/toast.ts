import { IConfig, IToast, IPatchedConfig } from './interfaces';
import { createElement, withDefaultConfigs } from './utils';

export function toast(text: string, _config: IConfig = {}): void {
  const config = withDefaultConfigs(_config);
  const container = createContainerIfNeeded();
  const toast = createToast(container, text, config);

  appendToast(container, toast.el);

  if (config.duration) {
    setTimeout(function () {
      removeToast(container, toast.el);
    }, config.duration);
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

function createToast(container: Element, text: string, config: IPatchedConfig): IToast {
  const el = createElement('div');
  const content = createElement('p');

  content.classList.add('toast__content');
  content.textContent = text;
  
  el.classList.add('toast', ...config.classes);
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
  const btn = createElement('button');

  btn.classList.add('toast__dismiss');
  btn.textContent = '×';
  btn.addEventListener('click', function () {
    toast.dismiss();
  }, { once: true });

  return btn;
}