import type {
  Pages,
  Pathname,
} from "../../../server/cross_platform_types/pages";

const pageCache = new Map<"allPages", Pages>();

/**
 * @param pathname - url pathname
 * @returns HTML string of pathname
 */
const getPageOfPathname = async (pathname: Pathname): Promise<string> => {
  const pageResources: Record<Pathname, () => Promise<Response>> = {
    "/": () => fetch("/src/pages/home.html"),
    "/careers": () => fetch("/src/pages/careers.html"),
    "/quote": () => fetch("/src/pages/quote.html"),
  };
  const currentPagePromise = pageResources[pathname]();
  if (!currentPagePromise)
    return Promise.reject(new Error("Page does not exist."));

  return currentPagePromise.then((r) => r?.text());
};

/**
 * @description Gets all pages for instant navigation
 * @returns all static pages
 */
const getAllStaticPages = async (): Promise<Pages> => {
  const allPages: Pages = await fetch("api/all_pages").then((r) => r?.json());
  pageCache.set("allPages", allPages);
  return allPages;
};

const pageService = { getPageOfPathname, getAllStaticPages, pageCache };
export default pageService;
