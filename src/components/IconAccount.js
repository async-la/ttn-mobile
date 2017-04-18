// @flow
import React from 'react'
import SVG, { G, Path } from 'react-native-svg'

import { BLUE } from '../constants/colors'

type Props = {
  fill: string,
}

const path = `M43.7,46.6l-9.6-4.8c-0.9-0.5-1.5-1.4-1.5-2.4V36c0.2-0.3,0.5-0.6,0.7-1c1.2-1.8,2.2-3.7,3-5.8
   c1.4-0.6,2.3-2,2.3-3.6v-4c0-1-0.4-1.9-1-2.6v-5.3c0.1-0.6,0.3-3.8-2.1-6.5c-2.1-2.3-5.4-3.5-9.9-3.5s-7.9,1.2-9.9,3.5
    c-2.4,2.7-2.1,6-2.1,6.5V19c-0.6,0.7-1,1.7-1,2.6v4c0,1.2,0.6,2.4,1.5,3.1c0.9,3.6,2.8,6.4,3.5,7.2v3.3c0,1-0.5,1.9-1.4,2.3
     l-8.9,4.9c-2.9,1.6-4.7,4.6-4.7,7.9v3.2c0,4.7,15,6,23,6s23-1.3,23-6v-3C48.7,51.2,46.8,48.1,43.7,46.6z`

const IconApplications = (props: Props) => {
  return (
    <SVG height="35" width="30">
      <G scale=".5">
        <Path stroke={BLUE} strokeWidth={3} fill={props.fill} d={path} />
      </G>
    </SVG>
  )
}

export default IconApplications
