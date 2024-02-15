import { isServer } from 'utils/isServer'

export const isLocal = () => {
  if (isServer()) {
    return (
      process.env.NODE_ENV === 'development' ||
      process.env.VERCEL_ENV === 'development'
    )
  } else {
    return window.location.hostname === 'localhost'
  }
}
