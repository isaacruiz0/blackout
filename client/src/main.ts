import "./style.css";

const getCurrentPage = async (pathname: string) => {
  let currentPagePromise: Promise<Response> | undefined;
  const homePagePath = "/src/pages/home.html",
    careersPagePath = "/src/pages/careers.html",
    quotePagePath = "/src/pages/quote.html";
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
const initPage = async () => {
  const pathname = window.location.pathname;
  const currentPageHtml = await getCurrentPage(pathname).then((r) => r?.text());
  const app = document.getElementById("app");
  if (!app || !currentPageHtml) return;
  app.innerHTML = currentPageHtml;
};

initPage();
