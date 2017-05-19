//@flow

export const US_WEST = 'us-west'
export const EU = 'eu'
export const BRAZIL = 'brazil'
export const ASIA_SE = 'asia-se'
export const NONE = 'none'

// Locations are not precise
export const locations = {
  [BRAZIL]: {
    latitude: -10.633336,
    longitude: -52.458779,
  },
  [US_WEST]: {
    latitude: 29.9103937,
    longitude: -105.7463544,
  },
  [EU]: {
    latitude: 50.753124,
    longitude: 10.101663,
  },
  [ASIA_SE]: {
    latitude: 16.333843,
    longitude: 103.867667,
  },
  [NONE]: {
    latitude: 0,
    longitude: 0,
  },
}
