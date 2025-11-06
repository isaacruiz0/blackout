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
const initInstantClientSideRouting = async (app: HTMLElement | undefined) => {
  if (!app) return;
  const allPages = await pageService.getAllStaticPages();
  const delegateInternalRouting = (e: Event) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const anchor = target.closest("a") as HTMLAnchorElement | null;
    if (!anchor) return;

    const pathname = new URL(anchor.href).pathname;
    if (!isValidPathname(pathname)) return;

    e.preventDefault();
    window.history.pushState(null, "", pathname);
    const page = allPages[pathname];
    app.innerHTML = page;
  };
  app.addEventListener("click", delegateInternalRouting);
  window.addEventListener("popstate", () => {
    if (isValidPathname(window.location.pathname)) {
      renderPageOfPathname(window.location.pathname);
    }
  });
};
/**
 * @description Render corresponding page for pathname and cache pages for navigation
 */
const initSinglePageApp = async () => {
  if (isValidPathname(window.location.pathname)) {
    const app = await renderPageOfPathname(window.location.pathname);
    initInstantClientSideRouting(app);
  } else {
    // TODO: render404
  }
};

initSinglePageApp();
