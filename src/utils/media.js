import { css } from 'styled-components'

export const breakpoints = {
  xlarge: 1500,
  large: 1100,
  medium: 768,
  small: 500,
}

// Iterate through the breakpoints and create a media template
const getMqRule = label => label === 'medium'
? '@media print, screen and '
: '@media'

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    ${getMqRule(label)} (min-width: ${breakpoints[label] / 16}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

export default mq