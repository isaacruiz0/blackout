import type { Pages } from "../../../server/cross_platform_types/pages";
import constants from "../constants";

const pageCache = new Map();

/**
 * @param pathname - url pathname
 * @returns HTML string of pathname
 */
const getPageOfPathname = async (pathname: string): Promise<string> => {
  const homePagePath = "/src/pages/home.html",
    careersPagePath = "/src/pages/careers.html",
    quotePagePath = "/src/pages/quote.html";

  let currentPagePromise;
  switch (pathname) {
    case constants.staticPathNames.home:
      currentPagePromise = fetch(homePagePath);
      break;
    case constants.staticPathNames.career:
      currentPagePromise = fetch(careersPagePath);
      break;
    case constants.staticPathNames.quote:
      currentPagePromise = fetch(quotePagePath);
      break;
  }
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
