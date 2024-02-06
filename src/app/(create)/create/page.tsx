import { CreatePacketsForm } from 'app/(create)/create/CreatePacketsForm'
import { RedPacket } from 'app/RedPacket'
import { Container } from 'components/ui/container'

export default function Home() {
  return (
    <>
      <RedPacket />

      <Container>
        <CreatePacketsForm />
      </Container>
    </>
  )
}
