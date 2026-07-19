import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { hasSupabaseEnvVars } from "@/lib/supabase/config"

export const hasEnvVars = hasSupabaseEnvVars

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
