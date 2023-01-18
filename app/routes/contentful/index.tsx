import type { LoaderFunction } from "@remix-run/server-runtime";
import * as routeUtils from "~/contentful/route-utils";

export const headers = routeUtils.headers;

export const meta = routeUtils.meta;

export const loader: LoaderFunction =
  routeUtils.getContentfulPageLoader("home");

export default routeUtils.ContentfulPageComponent;
