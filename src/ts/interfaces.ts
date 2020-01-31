export interface IConfig {
  duration?: number,
  classes?: string[],
  index?: string | number
};

export interface IToast {
  el: HTMLElement,
  dismiss: Function
}