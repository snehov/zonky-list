import { injectGlobal } from 'styled-components'
import { colorBlack, fontPrimary, colorGreyLight } from 'utils/variables'

import AvenirNextLTProRegular_otf from 'assets/fonts/AvenirNextLTPro-Regular.otf'
import AvenirNextLTProRegular_woff2 from 'assets/fonts/AvenirNextLTPro-Regular.woff2'

import AvenirNextLTProDemi_otf from 'assets/fonts/AvenirNextLTPro-Demi.otf'
import AvenirNextLTProDemi_woff2 from 'assets/fonts/AvenirNextLTPro-Demi.woff2'

injectGlobal`
html,
body {
  font-size: 62.5%;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
@page{
  size: A4;
  margin: 0;
}
body {
  overflow-x: hidden;
  background: ${colorGreyLight};
  color: ${colorBlack};
  font-family: ${fontPrimary};
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  @media print{
    transform: scale(0.8);
    transform-origin: 0 0;
    width: 125%;
  }
}

body.fontLoaded {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

#app {
  background-color: #fafafa;
  min-height: 100%;
  min-width: 100%;
}

@font-face{
  font-family :'AvenirNextLTPro';
  font-style: normal;
  font-weight: normal;

  src: url(${AvenirNextLTProRegular_woff2}) format('woff2'),
    url(${AvenirNextLTProRegular_otf}) format('opentype');
}
@font-face{
  font-family: 'AvenirNextLTPro';
  font-weight: bold;
  src: url(${AvenirNextLTProDemi_woff2}) format('woff2'),
    url(${AvenirNextLTProDemi_otf}) format('opentype');
}
`
