export interface IConfig {
  duration?: number,
  classes?: string[],
};

export interface IPatchedConfig {
  duration: number,
  classes: string[],
}

export interface IToast {
  el: HTMLElement,
  dismiss: Function
}