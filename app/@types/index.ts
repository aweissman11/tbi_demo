import { SitemapHandle } from "~/seo/sitemap.server";

export type i18nHandle = {
  i18n?: string[];
};

export type Handle = SitemapHandle | i18nHandle;
