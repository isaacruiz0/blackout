import "./style.css";
import type { Pathname } from "../../server/cross_platform_types/pages.ts";
import { isValidPathname } from "../../server/cross_platform_types/pages.ts";
import pageService from "./services/page.ts";

/**
 * @param app
 * @description Dynamically added scripts so that embeddeed comp's JS is executed
 * @warning pure side-effect
 */
const executeScripts = (app: HTMLElement) => {
  const scripts = app.querySelectorAll("script");
  scripts.forEach((script) => script.remove());
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    newScript.textContent = oldScript.textContent;
    app.append(newScript);
  });
};
/**
 * @description A shim for client side routing to allow scrolling a section into view from a hash url
 */
const scrollToSection = (hash: string, app?: HTMLElement) => {
  const context = app || document;
  const id = hash.substring(1);
  const element = context.querySelector(`#${id}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
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
  app.innerHTML = currentPageHtml;
  executeScripts(app);
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
    const { pathname, hash } = new URL(anchor.href);
    if (!isValidPathname(pathname)) return;
    e.preventDefault();
    window.history.pushState(null, "", pathname);
    const page = allPages[pathname];
    app.innerHTML = page;
    if (hash) {
      scrollToSection(hash, app);
    } else {
      window.scrollTo(0, 0);
    }
    executeScripts(app);
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
