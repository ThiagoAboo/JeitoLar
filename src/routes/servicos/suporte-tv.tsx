import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicos/suporte-tv")({
  beforeLoad: () => {
    throw redirect({ to: "/servicos/instalacoes", replace: true });
  },
});
