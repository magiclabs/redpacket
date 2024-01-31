import { MagicSigner } from '@alchemy/aa-signers'
import { magicApiKey } from 'config/client'

export const createMagicSigner = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const magicSigner = new MagicSigner({ apiKey: magicApiKey })

  return magicSigner
}
