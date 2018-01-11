import styled from 'styled-components'
import mq from 'utils/media'
import { colorWhite } from 'utils/variables'

export const ContainerHome = styled.div`
  max-width: 1240px;
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;
`
export const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;

  &:nth-child(even) {
    background-color: ${colorWhite};
  }
  ${mq.medium`
    padding-left: 70px;
    padding-right: 70px;
`};
`