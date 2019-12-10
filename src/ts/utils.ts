import { IConfig, IPatchedConfig } from './interfaces';

export function withDefaultConfigs(cnfg: IConfig): IPatchedConfig {
  return {
    duration: typeof cnfg.duration === 'undefined' 
      ? 3000 
      : cnfg.duration,
    classes: cnfg.classes || []
  };
}

export function createElement(type: string) {
  return document.createElement(type);
}