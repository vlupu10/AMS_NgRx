import { NgxUiLoaderConfig, POSITION, SPINNER } from 'ngx-ui-loader';

export const loaderConfig: NgxUiLoaderConfig = {
  bgsType: SPINNER.ballSpinClockwise,
  blur: 2,
  delay: 0,
  fgsColor: '#395d54',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER.rectangleBounce,
  overlayColor: 'rgba(255,255,255,0.8)',
  hasProgressBar: false,
  masterLoaderId: 'master',
};
