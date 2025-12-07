import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/documents/$docid/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/documents/$docid/edit/"!</div>
}
