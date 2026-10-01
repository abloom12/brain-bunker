---
title: Basics
description: The tRPC mental model and where its types come from.
---

tRPC lets a TypeScript client call **procedures** defined on a server. Calls still go over the network; the client just gets types inferred from the server instead of a separately maintained API contract.

## The shape

A **router** groups procedures. A **query** reads data, a **mutation** changes it, and a **subscription** streams updates. Here is one query:

```ts
// server/trpc.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  greet: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => ({ message: `Hello, ${input.name}!` })),
});

export type AppRouter = typeof appRouter;
```

The client imports **only the router type**, not the server implementation. It gets autocomplete and inferred input and output types without generating a client:

```ts
// client.ts
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server/trpc';

const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
});

const result = await trpc.greet.query({ name: 'Ada' });
// result.message is a string
```

This assumes the server exposes the router at `/trpc`; serving it is a separate setup step. TypeScript catches mistakes **in your code**, but cannot validate requests at runtime. The `.input(...)` schema checks incoming data on the server.

tRPC is a natural fit when you control both the TypeScript client and server. If unrelated or non-TypeScript clients need the API, plan how they will consume it rather than relying on shared TypeScript types.

Next: [tRPC's concepts](https://trpc.io/docs/concepts), [routers](https://trpc.io/docs/server/routers), [procedures](https://trpc.io/docs/server/procedures), [validation](https://trpc.io/docs/server/validators), and [client setup](https://trpc.io/docs/client).
