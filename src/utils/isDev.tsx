import { isServer } from 'utils/isServer'

export const isDev = () => {
  if (isServer()) {
    return process.env.ENV === 'dev'
  } else {
    return window.location.hostname === 'redpacket-dev.magiclabs.vercel.app'
  }
}
