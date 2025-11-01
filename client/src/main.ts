import "./style.css";

let allPages: Array<string | undefined> = [];

const homePagePath = "/src/pages/home.html",
  careersPagePath = "/src/pages/careers.html",
  quotePagePath = "/src/pages/quote.html";

const getCurrentPage = async (pathname: string) => {
  let currentPagePromise: Promise<Response> | undefined;
  switch (pathname) {
    case "/":
      currentPagePromise = fetch(homePagePath);
      break;
    case "/careers":
      currentPagePromise = fetch(careersPagePath);
      break;
    case "/quote":
      currentPagePromise = fetch(quotePagePath);
      break;
  }
  return currentPagePromise;
};

/**
 * @description Render corresponding page for path and cache pages for navigation
 */
const initSinglePageApp = async () => {
  const pathname = window.location.pathname;
  const currentPageHtml = await getCurrentPage(pathname).then((r) => r?.text());
  const app = document.getElementById("app");
  if (!app || !currentPageHtml) return;
  app.innerHTML = currentPageHtml;

  getAllPages();
};

const getAllPages = async () => {
  allPages = await fetch("api/all_pages").then((r) => r?.json());
};

initSinglePageApp();
