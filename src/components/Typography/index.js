import styled from 'styled-components'
import { Link } from 'react-router-dom'
import mq from 'utils/media'

export const H1 = styled.h1`
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.headline};
  font-size: 40px;
  font-size: 4rem;
  letter-spacing: 1px;
`
export const H2 = styled.h2`
  text-transform: uppercase;
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 70px;
  font-family: ${props => props.theme.fonts.headline};
`
export const H3 = styled.h3`
  font-size: 1.5rem;
  letter-spacing: 2px;
  line-height: 24px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 50px;
  font-family: ${props => props.theme.fonts.headline};
`