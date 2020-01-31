import { IConfig } from './interfaces';

export function withDefaultConfigs(cnfg: IConfig): Required<IConfig> {
  return {
    duration: typeof cnfg.duration === 'undefined' 
      ? 3000 
      : cnfg.duration,
    classes: cnfg.classes || [],
    index: cnfg.index ? cnfg.index : ''
  };
}

export function createElement(type: string) {
  return document.createElement(type);
}