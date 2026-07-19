const REST_PATH_PATTERN = /\/rest\/v1\/?$/;

export function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!url) {
    return undefined;
  }

  return url.replace(REST_PATH_PATTERN, "").replace(/\/$/, "");
}

export function getSupabasePublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
}

export const hasSupabaseEnvVars =
  Boolean(getSupabaseUrl()) && Boolean(getSupabasePublishableKey());

