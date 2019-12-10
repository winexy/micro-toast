export interface IConfig {
  html: string,
  timeOut?: number,
  classes?: string[],
};

export interface IToast {
  el: HTMLElement,
  dismiss: Function
}