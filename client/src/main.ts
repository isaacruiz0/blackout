import "./style.css";
import type { Pathname } from "../../server/cross_platform_types/pages.ts";
import { isValidPathname } from "../../server/cross_platform_types/pages.ts";
import pageService from "./services/page.ts";

/**
 * @description Renders corresponding page for pathname
 */
const renderPageOfPathname = async (pathname: Pathname) => {
  let currentPageHtml;
  if (pageService.pageCache.has("allPages")) {
    currentPageHtml = pageService.pageCache.get("allPages")?.[pathname];
  } else {
    currentPageHtml = await pageService.getPageOfPathname(pathname);
  }
  const app = document.getElementById("app");
  if (!app || !currentPageHtml) return;
  // QUESTION: How will this effect navbar if at all?
  app.innerHTML = currentPageHtml;
  return app;
};
/**
 *
 */
const initInstantClientSideRouting = async () => {};
/**
 * @description Render corresponding page for pathname and cache pages for navigation
 */
const initSinglePageApp = async () => {
  if (isValidPathname(window.location.pathname)) {
    await renderPageOfPathname(window.location.pathname);
    initInstantClientSideRouting();
  } else {
    // TODO: render404
  }
};

initSinglePageApp();
