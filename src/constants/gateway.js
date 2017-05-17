//@flow
import { ASIA_SE, EU, US_WEST, BRAZIL, locations } from './location'

export const frequencyPlans = [
  {
    label: 'Asia 920-923MHz',
    value: 'AS_920_923',
    location: locations[ASIA_SE],
  },
  {
    label: 'Asia 923-925MHz',
    value: 'AS_923_925',
    location: locations[ASIA_SE],
  },
  {
    label: 'Australia 915MHz',
    value: 'AU_915_928',
    location: locations[BRAZIL],
  },
  { label: 'Europe 868MHz', value: 'EU_863_870', location: locations[EU] },
  {
    label: 'United States 915MHz',
    value: 'US_902_928',
    location: locations[US_WEST],
  },
]

export const routers = [
  {
    label: 'asia-se',
    value: 'ttn-router-asia-se',
    location: locations[ASIA_SE],
  },
  { label: 'brazil', value: 'ttn-router-brazil', location: locations[BRAZIL] },
  { label: 'eu', value: 'ttn-router-eu', location: locations[EU] },
  {
    label: 'us-west',
    value: 'ttn-router-us-west',
    location: locations[US_WEST],
  },
]
