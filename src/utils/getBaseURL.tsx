import { PROD_URL } from 'config/url'
import { isDev } from 'utils/isDev'
import { isLocal } from 'utils/isLocal'
import { isProd } from 'utils/isProd'

export const getBaseURL = () => {
  return isLocal()
    ? `http://localhost:3009`
    : isDev()
      ? `https://redpacket-dev.magiclabs.vercel.app`
      : isProd()
        ? PROD_URL
        : `https://${process.env.VERCEL_URL!}`
}
