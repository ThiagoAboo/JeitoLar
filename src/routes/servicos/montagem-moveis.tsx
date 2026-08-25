import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicos/montagem-moveis")({
  beforeLoad: () => {
    throw redirect({ to: "/servicos/montagem", replace: true });
  },
});
