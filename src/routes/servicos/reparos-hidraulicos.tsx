import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/servicos/reparos-hidraulicos")({
  beforeLoad: () => {
    throw redirect({ to: "/servicos/hidraulica", replace: true });
  },
});
