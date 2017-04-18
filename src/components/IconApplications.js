// @flow
import React from 'react'
import SVG, { G, Path } from 'react-native-svg'

import { BLUE } from '../constants/colors'

const path =
  'M8.7,54.8c-4.8-2.8-4.8-7.3,0-10L41.2,26c4.8-2.8,12.5-2.8,17.3,0l32.6,18.9 c4.8,2.8,4.8,7.3,0,10L58.5,73.7c-4.8,2.8-12.5,2.8-17.3,0L8.7,54.8z'

type Props = {
  fill: string,
}

const IconApplications = (props: Props) => {
  return (
    <SVG height="44" width="44">
      <G scale="0.33">
        <Path d={path} stroke={BLUE} y={40} strokeWidth={4} fill={props.fill} />
        <Path d={path} stroke={BLUE} y={20} strokeWidth={4} fill={props.fill} />
        <Path d={path} stroke={BLUE} y={0} strokeWidth={4} fill={props.fill} />
      </G>
    </SVG>
  )
}

export default IconApplications
