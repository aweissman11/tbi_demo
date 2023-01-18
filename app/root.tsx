// Remix
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
// Styles
import tailwindStylesheetUrl from "~/tailwind/tailwind.css";
import fontsStyleSheetUrl from "../styles/fonts.css";
// Providers & Hooks
import { i18n } from "~/i18n.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import { getEnv } from "~/config";
import { supportedLanguages } from "./i18n-config";
// Other
import { pathedRoutes } from "./other-routes.server";
import { AnimatePresence } from "framer-motion";
// Components
import { Nav, Footer } from "~/components/layout";
import { Button } from "~/components/interactive";
import { Transition } from "./Transition";
import { GoogleAnalytics } from "~/components/plugins";
import type { Handle } from "~/@types";
import { getAlternateHref } from "~/utils";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: fontsStyleSheetUrl },
    { rel: "shortcut icon", href: "/favicon.svg" },
  ];
};

export const meta: MetaFunction = () => {
  /**
   * This is the root meta tag for the project, and is applied to every page.
   * You'll probably want to customize this for your project.
   * See: https://ogp.me/
   */
  const description =
    "DEPT DASH™ is an opinionated framework for building web applications.";

  return {
    charset: "utf-8",
    title: "DEPT DASH™",
    keywords: "DEPT,blog,store,agency",
    "twitter:creator": "@deptagency",
    "twitter:site": "@deptagency",
    "twitter:title": "DEPT DASH™",
    "twitter:description": description,
    viewport: "width=device-width,initial-scale=1",
  };
};

type LoaderData = {
  GLOBALS: string;
  GA_TRACKING_ID: string | null;
  PUBLICLY_AVAILABLE_ORIGIN: string;
  locale: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  // because this is called for every route, we'll do an early return for anything
  // that has a other route setup. The response will be handled there.
  if (pathedRoutes[new URL(request.url).pathname]) {
    return new Response();
  }
  const locale = await i18n.getLocale(request);
  return json<LoaderData>({
    GA_TRACKING_ID: getEnv("GA_TRACKING_ID", { default: null }),
    PUBLICLY_AVAILABLE_ORIGIN: getEnv("PUBLICLY_AVAILABLE_ORIGIN"),
    locale,
    GLOBALS: JSON.stringify({
      SENTRY_DSN: getEnv("SENTRY_DSN", { default: null }),
    }),
  });
};

function useGoogleAnalytics() {
  const { GA_TRACKING_ID } = useLoaderData<LoaderData>();
  if (!GA_TRACKING_ID?.length) return null;
  return GA_TRACKING_ID;
}

/**
 * Construct <link rel="alternate"> tags to inform search engines and browsers
 * about locale variants of the page, as described at https://developers.google.com/search/docs/advanced/crawling/localized-versions#html
 */
function useAlternateLinks() {
  const { locale, PUBLICLY_AVAILABLE_ORIGIN } = useLoaderData<LoaderData>();
  const { pathname, search } = useLocation();

  if (!PUBLICLY_AVAILABLE_ORIGIN) return [];
  const links = supportedLanguages
    .filter((lang) => lang.code !== locale) // skip current locale
    .map((lang) => (
      <link
        key={lang.code}
        rel="alternate"
        hrefLang={lang.code}
        href={getAlternateHref(PUBLICLY_AVAILABLE_ORIGIN, lang.code)}
      />
    ));
  links.push(
    <link
      key="x-default"
      rel="alternate"
      hrefLang="x-default"
      href={`${PUBLICLY_AVAILABLE_ORIGIN}${pathname}${search}`}
    />
  );
  return links;
}

export const handle: Handle = {
  // In the handle export, we could add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: [],
};

export default function App() {
  let { locale, GLOBALS } = useLoaderData<LoaderData>();
  let { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  const alternateLinks = useAlternateLinks();
  const gaTrackingId = useGoogleAnalytics();

  return (
    <html lang={locale} className="h-full" dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        {alternateLinks}
        {gaTrackingId && <GoogleAnalytics gaTrackingId={gaTrackingId} />}
      </head>

      <body className="h-full">
        {/* This nav is rendered on non-contentful routes. */}
        <Nav
          sticky={true}
          banner={
            <div className="text-center text-xs">
              Here is a ticket banner for important messages
            </div>
          }
        />
        <AnimatePresence mode="wait" initial={false}>
          <Transition>
            <Outlet />
          </Transition>
        </AnimatePresence>

        <Footer />

        <ScrollRestoration />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: `window.GLOBALS=${GLOBALS}` }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: any }) {
  console.error(error);
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen flex-col items-center justify-center">
          <p className="text-2xl font-semibold">An error occurred</p>
          {process.env.NODE_ENV !== "production" && (
            <pre className="flex text-sm text-gray-500">
              <code>{error.message}</code>
            </pre>
          )}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.error(caught);
  return (
    <html lang="en">
      <head>
        <title>Unexpected error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen flex-col items-center justify-center">
          <h1>{caught.status}</h1>
          <p className="flex text-sm text-gray-500">{caught.statusText}</p>
          {process.env.NODE_ENV !== "production" && (
            <pre className="flex text-sm text-gray-500">
              {caught.data && <code>{caught.data}</code>}
            </pre>
          )}
          <br />
          <Button to="/" aria-label="Go home">
            Go home
          </Button>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
