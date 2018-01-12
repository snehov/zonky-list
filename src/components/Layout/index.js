import styled from 'styled-components'
import mq from 'utils/media'
import { colorWhite } from 'utils/variables'

export const ContainerHome = styled.div`
  max-width: 1240px;
  width: 100%;
  padding: 0 30px;
  margin: 0 auto;
`
export const ContainerFluid = styled.div`
  margin-left: 30px;
  margin-right: 30px;
`
export const Container = styled.div`
  width: 1240px;
  max-width: 100%;
  /* padding: 0 30px; */
  margin: 0 auto;

  &:nth-child(even) {
    background-color: ${colorWhite};
  }
  ${mq.medium`
    padding-left: 0px;
    padding-right: 0px;
`};
`
