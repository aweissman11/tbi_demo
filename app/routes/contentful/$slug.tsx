import * as routeUtils from "~/contentful/route-utils";

export const headers = routeUtils.headers;

export const meta = routeUtils.meta;

export const loader = routeUtils.getContentfulPageLoader();

export default routeUtils.ContentfulPageComponent;

export function ErrorBoundary({ error }: { error: any }) {
  console.error(error);
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-xl">An error occurred</p>
      {process.env.NODE_ENV !== "production" && (
        <pre className="text-sm text-gray-500">
          <code>{error.message}</code>
        </pre>
      )}
    </div>
  );
}
