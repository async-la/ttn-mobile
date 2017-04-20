// @flow

export type AppStatePayload = {
  appState: string,
};

export type KeyboardStatusPayload = {
  visible: boolean,
  layout: Object,
};

export type NetworkStatusPayload = {
  isConnected: boolean,
};

export type ViewportPayload = {
  height: number,
  width: number,
};
