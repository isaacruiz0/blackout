import "./style.css";
import type { Pages } from "../../server/cross_platform_types/pages.ts";
/**
 * @description Render corresponding page for path and cache pages for navigation
 */
const initSinglePageApp = async () => {
  const staticPathNames = {
    home: "/",
    career: "/careers",
    quote: "/quote",
  };

  const renderCurrentPage = async () => {
    const getCurrentPage = async (pathname: string): Promise<Response> => {
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

      return currentPagePromise;
    };
    const pathname = window.location.pathname;
    const currentPageHtml = await getCurrentPage(pathname).then((r) =>
      r?.text(),
    );
    const app = document.getElementById("app");
    if (!app || !currentPageHtml) return;
    app.innerHTML = currentPageHtml;
    return app;
  };
  const initInstantClientSideRouting = async () => {
    /**
     * @description Cache all pages for instant navigation
     */
    const getAllStaticPages = async (): Promise<Pages> => {
      const allPages: Pages = await fetch("api/all_pages").then((r) =>
        r?.json(),
      );
      return allPages;
    };

    /**
     * @description Override the anchor elements default nav behavior to prevent page refreshes and then to navigate to cached page
     */
    const overrideAnchorElems = (app: HTMLElement | null, pages: Pages) => {
      if (!app) return;
      const anchorElements = app.getElementsByTagName("a");
      // CHECKPOINT - Remove / from href
      for (const anchorElement of anchorElements) {
        switch (anchorElement.href) {
          case staticPages.home:
            anchorElement.addEventListener("click", (e) => {
              e.preventDefault();
              app.innerHTML = pages.home;
              overrideAnchorElems(app, pages);
            });
            break;
          case staticPathNames.career:
            anchorElement.addEventListener("click", (e) => {
              e.preventDefault();
              app.innerHTML = pages.career;
              overrideAnchorElems(app, pages);
            });
            break;
          case staticPathNames.quote:
            anchorElement.addEventListener("click", (e) => {
              e.preventDefault();
              app.innerHTML = pages.quote;
              overrideAnchorElems(app, pages);
            });
            break;
        }
      }
    };
    const app = document.getElementById("app");
    const staticPages = await getAllStaticPages();
    overrideAnchorElems(app, staticPages);
  };
  renderCurrentPage();
  initInstantClientSideRouting();
};

initSinglePageApp();
