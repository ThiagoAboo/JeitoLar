import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicos/prateleiras-cortinas")({
  beforeLoad: () => {
    throw redirect({ to: "/servicos/instalacoes", replace: true });
  },
});
