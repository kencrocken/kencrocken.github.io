---
layout: ../../layouts/ShopTalkLayout.astro
slug: "spa-layers-architecture"
title: "Single Page Application Layers & Architecture"
description: "A practical architecture walkthrough of a React SPA using Lunar Phase as the example: clear layer boundaries, data flow, and production-ready implementation details."
repo: "https://github.com/kencrocken/lunar_phase"
projectSite: "https://kencrocken.github.io/lunar_phase"
# headerImage: "/images/spa-layers-architecture.jpg"
---

This is a practical architecture guide for a React SPA, using **Lunar Phase** as the running example. The goal is to keep the design simple to scale: clear ownership per layer, predictable data flow, and production-ready behavior.

## Architecture at a glance

```text
src/
  app/
    routes.tsx                  # route definitions
    providers.tsx               # app-level providers
  pages/
    MoonPage.tsx                # route-level page container
  features/moon/
    MoonCard.tsx                # presentation component
    useMoonPhase.ts             # feature hook (orchestration)
    moonSelectors.ts            # derived view data
  domain/moon/
    moon.ts                     # domain model + rules
    moonTransforms.ts           # pure business transforms
  services/navalObservatory/
    client.ts                   # HTTP client + error mapping
    dto.ts                      # API response types
  state/
    moonStore.ts                # global state slice/store
  shared/
    ui/                         # reusable UI primitives
    telemetry/                  # logs/metrics/events
```

## Layer contracts (what belongs where)

1. **Presentation/UI layer**
   - Owns rendering and user interaction.
   - Can call feature hooks and read derived state.
   - Must not call HTTP APIs directly.
2. **Feature orchestration layer**
   - Owns screen-level use cases (`load moon phase`, `refresh`, `retry`).
   - Coordinates state updates + service calls.
   - Must not include domain math/rules inline.
3. **Domain/business layer**
   - Owns pure rules and transforms.
   - No framework or network dependencies.
4. **Service/data-access layer**
   - Owns API calls, DTO parsing, and transport error mapping.
   - Returns typed results to feature layer.
5. **State layer**
   - Owns app/shared state and selectors.
   - No direct network calls inside reducers/store definitions.
6. **Routing layer**
   - Owns route mapping and code splitting boundaries.
   - Should not contain business logic.

## End-to-end data flow

1. User opens `/moon` route.
2. `MoonPage` renders and calls `useMoonPhase`.
3. Hook checks current state and triggers a service request when needed.
4. Service client fetches current lunar data and maps raw DTO to typed domain input.
5. Domain transforms compute display-ready values.
6. State updates once with `idle | loading | success | error`.
7. UI renders data or an error state with retry action.

## Safer data-fetching pattern (React)

```tsx
import { useEffect, useRef, useState } from "react";
import { getMoonPhase } from "../services/navalObservatory/client";
import { toMoonViewModel } from "../domain/moon/moonTransforms";

type Status = "idle" | "loading" | "success" | "error";

export function useMoonPhase(date: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<ReturnType<typeof toMoonViewModel> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;

    async function run() {
      setStatus("loading");
      setError(null);

      try {
        const dto = await getMoonPhase(date, { signal: controller.signal });
        if (requestId !== requestIdRef.current) return; // stale response guard
        setData(toMoonViewModel(dto));
        setStatus("success");
      } catch (e) {
        if (controller.signal.aborted) return;
        if (requestId !== requestIdRef.current) return;
        setError(e instanceof Error ? e.message : "Unknown error");
        setStatus("error");
      }
    }

    run();
    return () => controller.abort();
  }, [date]);

  return { status, data, error };
}
```

Why this is better than a minimal `useEffect + fetch` example:
- Handles cancellation on unmount/param change.
- Prevents stale requests from overwriting newer data.
- Exposes explicit UI states for consistent rendering.
- Keeps transport and domain transforms outside the component.

## Production checklist by concern

- **Reliability**: retries with backoff for transient failures, error mapping by status code.
- **Observability**: structured logs for fetch start/success/failure, key UX events, request timing.
- **Security/auth**: token handling strategy, auth-aware error states (401/403), least-privilege API scope.
- **Performance**: route-level code splitting, memoized selectors, avoid duplicate requests.
- **Testing**:
  - Unit test domain transforms (pure functions).
  - Integration test feature hooks with mocked service layer.
  - UI test loading/error/success states.
  - Route test deep links and navigation transitions.

## Key takeaways

- Keep layer boundaries strict and documented.
- Put domain rules in pure modules, not UI hooks.
- Treat data fetching as a failure-prone workflow, not a one-liner.
- Design architecture so testing and observability are built in from day one.
