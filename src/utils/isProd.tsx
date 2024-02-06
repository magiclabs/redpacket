import { PROD_URL } from 'config/url'
import { isServer } from 'utils/isServer'

export const isProd = () => {
  if (isServer()) {
    return process.env.VERCEL_ENV === 'production'
  } else {
    return window.location.origin === PROD_URL
  }
}
