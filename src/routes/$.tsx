import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/not-found";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found: Bench" },
      {
        name: "description",
        content: "That address is not a Bench page. Go back to the six programs or open a comparison.",
      },
    ],
  }),
  component: NotFoundPage,
});
