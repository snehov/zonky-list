import styled from 'styled-components'
import { Link } from 'react-router-dom'

export function buttonStyle(margin, type, narrow) {
  return `color: white;
  font-weight: bold;
  padding: ${narrow ? '0.375rem 0.75rem;' : '0.375rem 2.75rem;'}
  background-color: #2c84c3;
  ${type === 'green' && 'background-color: #36ae1c;'}
  ${type === 'purple' && 'background-color: #bd5fbd;'}
  text-align: center;
  ${type === 'yellow' && 'background-color: #e2c00c;'}

	white-space: nowrap;
	vertical-align: middle;
	display: inline-block;
	font-size: 1rem;
	line-height: 1.5;a
	transition: all 0.4s ease-in-out;
	cursor: pointer;
  user-select: none;
  text-decoration: none;
  border: 1px solid transparent;
  margin: ${margin === 'no' ? '0' : '3'}px;
  transition: all 0.35s ease-in-out;

  &:hover {
    filter: brightness(115%);
    transition: all 0.2s ease-in-out;
	}
	&:focus {
		filter: brightness(85%);
  }
  `
}

export const Button = styled.button`
  ${props => buttonStyle('', props.color, props.narrow)};
`
export const ButtonA = styled.a`
  ${props => buttonStyle('', props.color, props.narrow)};
`
export const LinkAsButton = styled(Link)`
  ${props => buttonStyle('', props.color, props.narrow)};
`
export const SpanAsButton = styled.span`
  display: inline-block;
  ${props => buttonStyle('', props.color, props.narrow)};
`
