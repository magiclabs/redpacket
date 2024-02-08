import { MAGIC_1ETH_CONTRACT_ADDRESS } from 'lib/constants'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect(`/claim/${MAGIC_1ETH_CONTRACT_ADDRESS}`)
}
