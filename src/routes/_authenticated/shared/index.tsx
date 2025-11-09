import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/shared/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/shared/"!</div>
}
