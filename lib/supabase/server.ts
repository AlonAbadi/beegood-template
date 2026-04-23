/**
 * Server-side Supabase client - uses the SERVICE ROLE key.
 * Never import this in client components. Only use in:
 *   - Route Handlers (app/api/**)
 *   - Server Actions
 *   - Server Components that need elevated access
 *
 * When PREVIEW_MODE=true (Atelier preview deployments), returns a no-op mock
 * so the site renders without real Supabase credentials.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ── Preview mock ──────────────────────────────────────────────────────────────
// Returns a chainable object that resolves to empty data on every query.
// Covers: .from().select/insert/update/upsert/delete + .single() + .maybeSingle()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPreviewClient(): any {
  const emptyList = { data: [] as never[], error: null, count: null, status: 200, statusText: "OK" };
  const emptyItem = { data: null,          error: null, count: null, status: 200, statusText: "OK" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chain: any = {
    single:      () => Promise.resolve(emptyItem),
    maybeSingle: () => Promise.resolve(emptyItem),
    then(resolve: (v: typeof emptyList) => void, reject?: (e: unknown) => void) {
      return Promise.resolve(emptyList).then(resolve, reject);
    },
    catch(fn: (e: unknown) => void) { return Promise.resolve(emptyList).catch(fn); },
    finally(fn: () => void)         { return Promise.resolve(emptyList).finally(fn); },
  };

  for (const m of [
    "select", "insert", "update", "upsert", "delete",
    "eq", "neq", "is", "in", "gt", "gte", "lt", "lte",
    "like", "ilike", "or", "not", "filter", "match",
    "order", "limit", "range", "returns", "throwOnError",
  ]) {
    chain[m] = () => chain;
  }

  return {
    from: () => chain,
    rpc:  () => chain,
    auth: {
      getUser:    () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signOut:    () => Promise.resolve({ error: null }),
    },
    storage: {
      from: () => ({
        upload:       () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
        remove:       () => Promise.resolve({ data: null, error: null }),
      }),
    },
  };
}

// ── Real client ───────────────────────────────────────────────────────────────

export function createServerClient() {
  if (process.env.PREVIEW_MODE === "true") {
    return createPreviewClient() as ReturnType<typeof createClient<Database>>;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
