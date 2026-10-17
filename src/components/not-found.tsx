import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/shell";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found: Bench";
  }, []);

  return (
    <Shell>
      <div className="mx-auto w-full max-w-page px-5 py-24 md:px-8">
        <p className="eyebrow">404</p>
        <h1 className="display-md mt-3">That page is not on the bench.</h1>
        <p className="mt-4 max-w-xl">
          The address does not match a program, a comparison, or a guide. Nothing here was hidden on purpose.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
          <Link to="/compare" search={{ ids: "", cat: "overview" }} className="btn btn-secondary">
            Compare
          </Link>
        </div>
      </div>
    </Shell>
  );
}
