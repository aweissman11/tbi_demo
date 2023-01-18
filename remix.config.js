const { getDependenciesToBundle } = require("@remix-run/dev");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  // We have to hardcode the dev port because of this remix bug: https://github.com/remix-run/remix/issues/3314
  devServerPort: 8002,
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    ...getDependenciesToBundle("parse-domain", "is-ip", "ip-regex"),
  ],
};
