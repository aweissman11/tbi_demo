import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { i18n } from "~/i18n.server";
// Types
import { INavContainer, SpecificLocale } from "~/@types/generated/contentful";
// Components
import { Nav } from "~/contentful/components/Nav";
import { NavProvider } from "~/contentful/components/NavProvider";
import { getNavContainer } from "~/contentful/index.server";

type LoaderData = {
  primaryNav: SpecificLocale<INavContainer>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18n.getLocale(request);
  const primaryNav = await getNavContainer("primary", {
    locale,
    preview: new URL(request.url).searchParams.get("preview") === "1",
  });
  return json<LoaderData>({
    primaryNav,
  });
};

export default function Contentful() {
  let { primaryNav } = useLoaderData<LoaderData>();

  return (
    <>
      {/**
       * for Contentful routes, we're using a
       * dynamic Contentful-based navigation bar.
       */}
      <NavProvider navContainers={{ primaryNav }}>
        <Nav
          sticky={true}
          // TODO: pull this from contentful
          banner={
            <div className="text-center text-xs">
              Here is a ticket banner for important messages
            </div>
          }
        />
        <Outlet />
      </NavProvider>
    </>
  );
}
