import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function assertUnreachable(x: never): never {
  throw new Error(`expected never to reach this case, but here we are: ${x}`);
}

export function getAlternateHref(
  publiclyAvailableOrigin: string,
  langCode?: string
): string {
  const urlSplitted = publiclyAvailableOrigin.split("://");
  if (urlSplitted.length !== 2) {
    throw new Error(
      `Invalid publiclyAvailableOrigin: ${publiclyAvailableOrigin}`
    );
  }
  const [protocol, domain] = urlSplitted;
  if (langCode) {
    // We are using a subdomain for the language, so we need to add the language only to the domain.
    // For example, if the publiclyAvailableOrigin is https://example.com, and the langCode is "fr-CA",
    // the result will be https://fr.example.com
    const lang = new Intl.Locale(langCode).language;
    return `${protocol}://${lang}.${domain}`;
  }
  return `${protocol}://${domain}`;
}
