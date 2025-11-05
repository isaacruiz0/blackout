import type { Pages } from "../../../server/cross_platform_types/pages";
const staticPathNames = {
  home: "/",
  career: "/careers",
  quote: "/quote",
};

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
    case staticPathNames.home:
      currentPagePromise = fetch(homePagePath);
      break;
    case staticPathNames.career:
      currentPagePromise = fetch(careersPagePath);
      break;
    case staticPathNames.quote:
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
  return allPages;
};

const pageService = { getPageOfPathname, getAllStaticPages };
export default pageService;
