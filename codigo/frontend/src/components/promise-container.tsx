"use client";

import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function PromiseContainer({ children, errorFallback }: { children: React.ReactNode, errorFallback: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={errorFallback}
    >
      <Suspense
        fallback={
          <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
