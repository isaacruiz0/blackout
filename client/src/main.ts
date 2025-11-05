import "./style.css";
import type { Pages } from "../../server/cross_platform_types/pages.ts";
import constants from "./constants.ts";
import pageService from "./services/page.ts";
/**
 * @description Render corresponding page for pathname and cache pages for navigation
 */
const initSinglePageApp = async () => {
  /**
   * @description Renders correspondingpage for pathname
   */
  const renderCurrentPage = async () => {
    // ADD LOGIC - If all pages is loaded then use that;
    const currentPageHtml = await pageService.getPageOfPathname(
      window.location.pathname,
    );
    const app = document.getElementById("app");
    if (!app || !currentPageHtml) return;
    // QUESTION: How will this effect navbar if at all?
    app.innerHTML = currentPageHtml;
    return app;
  };
  const initInstantClientSideRouting = async () => {
    /**
     * @description Override the anchor elements default nav behavior to prevent page refreshes and then to navigate to cached page
     */
    const overrideAnchorElems = (app: HTMLElement | null, pages: Pages) => {
      if (!app) return;
      const anchorElements = app.getElementsByTagName("a");
      for (const anchorElement of anchorElements) {
        switch (anchorElement.pathname) {
          case constants.staticPathNames.home:
            anchorElement.addEventListener("click", (e) => {
              e.preventDefault();
              history.pushState(null, "", constants.staticPathNames.home);
              app.innerHTML = pages.home;
              overrideAnchorElems(app, pages);
            });
            break;
          case constants.staticPathNames.career:
            anchorElement.addEventListener("click", (e) => {
              e.preventDefault();
              history.pushState(null, "", constants.staticPathNames.career);
              app.innerHTML = pages.career;
              overrideAnchorElems(app, pages);
            });
            break;
          case constants.staticPathNames.quote:
            anchorElement.addEventListener("click", (e) => {
              e.preventDefault();
              history.pushState(null, "", constants.staticPathNames.quote);
              app.innerHTML = pages.quote;
              overrideAnchorElems(app, pages);
            });
            break;
        }
      }
    };
    const app = document.getElementById("app");
    const staticPages = await pageService.getAllStaticPages();
    overrideAnchorElems(app, staticPages);
  };
  renderCurrentPage();
  initInstantClientSideRouting();
};

initSinglePageApp();
