// @flow

import React from 'react'

import { BLUE, MID_GREY } from '../constants/colors'
import StatusDot from '../components/StatusDot'

import type { TTNGateway } from '../scopes/content/gateways/types'

type Props = {
  gateway: TTNGateway,
}

const LAST_SEEN_LIMIT_MSECS = 1000 * 60 // 1 minute

export default function GatewayStatusDot(props: Props): React.Element<any> {
  const { gateway } = props
  const lastSeen = gateway.status ? gateway.status.time : 0
  const isAlive = Date.now() - lastSeen / (1000 * 1000) < LAST_SEEN_LIMIT_MSECS
  return <StatusDot downColor={MID_GREY} up={isAlive} upColor={BLUE} />
}
