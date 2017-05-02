// @flow

type Collaborator = {
  username: string,
  rights: Array<string>,
}

export type Gateway = {
  id: string,
  activated: boolean,
  frequency_plan: string,
  frequency_plan_url: string,
  auto_update: boolean,
  location_public: boolean,
  status_public: boolean,
  owner_public: boolean,
  antenna_location: {
    longitude: number,
    latitude: number,
    altitude: number,
  },
  collaborators: ?Array<Collaborator>,
  key: string,
  token: {
    access_token: string,
    expiry: string,
  },
  attributes: {
    brand: string,
    model: string,
    placement: string,
    antenna_model: string,
    description: string,
  },
  router: Router,
  fallback_routers: Array<Router>,
  owner: { id: string, username: string },
  rights: ?Array<string>,
  status: {
    time: number,
    gps: { altitude: number },
    rx_ok: number,
    tx_in: number,
  },
}

type Router = {
  id: string,
  address: string,
  mqtt_address: string,
}

export const RECEIVE_GATEWAY = 'content/RECEIVE_GATEWAY'
export const RECEIVE_GATEWAYS = 'content/RECEIVE_GATEWAYS'

export type ReceiveGatewayAction = {
  type: 'content/RECEIVE_GATEWAY',
  payload: Gateway,
}

export type ReceiveGatewaysAction = {
  type: 'content/RECEIVE_GATEWAYS',
  payload: Array<Gateway>,
}

export type GatewayAction = ReceiveGatewayAction | ReceiveGatewaysAction
