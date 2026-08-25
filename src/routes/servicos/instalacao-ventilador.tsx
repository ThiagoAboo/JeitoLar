import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicos/instalacao-ventilador")({
  beforeLoad: () => {
    throw redirect({ to: "/servicos/eletrica", replace: true });
  },
});
