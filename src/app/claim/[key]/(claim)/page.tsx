import { ClaimPacket } from 'app/claim/[key]/(claim)/ClaimPacket'
import { Container } from 'components/ui/container'

export default function Home() {
  return (
    <>
      <Container className="max-w-[520px] justify-center">
        <ClaimPacket />
      </Container>
    </>
  )
}
