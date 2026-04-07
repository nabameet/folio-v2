import { useCallback, useEffect, useMemo, useState } from "react";

type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "theme-preference";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";
}

function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

function applyThemePreference(pref: ThemePreference) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (pref === "system") {
    root.removeAttribute("data-theme");
    return;
  }

  root.setAttribute("data-theme", pref);
}

export function useThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const pref = readStoredPreference();
    setPreference(pref);
    applyThemePreference(pref);
  }, []);

  // Keep system theme live if preference is "system"
  useEffect(() => {
    if (preference !== "system") return;
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyThemePreference("system");

    media.addEventListener?.("change", handler);
    return () => media.removeEventListener?.("change", handler);
  }, [preference]);

  const effectiveTheme = useMemo<"light" | "dark">(() => {
    if (preference === "system") return getSystemTheme();
    return preference;
  }, [preference]);

  const toggle = useCallback(() => {
    setPreference((prev) => {
      const next: ThemePreference =
        (prev === "system" ? getSystemTheme() : prev) === "dark"
          ? "light"
          : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      applyThemePreference(next);
      return next;
    });
  }, []);

  return { preference, effectiveTheme, toggle };
}

