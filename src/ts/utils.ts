import { IConfig } from './interfaces';

export function normalizeConfig(config: IConfig | string): IConfig {
  if (typeof config === 'string') {
    return { html: config };
  } else {
    return config;
  }
}

export function createElement(type: string) {
  return document.createElement(type);
}