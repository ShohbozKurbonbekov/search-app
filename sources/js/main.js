import {
  setsearchBarFocus,
  showClearButton,
  clearSearchText,
  clearPushListener,
} from "./searchBar.js";
import { getSearchTerm, returnSearchResults } from "./dataFunctions.js";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStateLine,
  setStateLine,
} from "./searchResults.js";

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});

const initApp = function () {
  // TODO  set the focus.
  setsearchBarFocus();
  // TODO 3 listeners clear text
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", showClearButton);

  const clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", clearSearchText);

  clearButton.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

const submitTheSearch = function (e) {
  //  prevent default behavior.
  e.preventDefault();

  // TODO  delete search results.
  deleteSearchResults();
  // process the search.
  processTheSearch();

  //  set the focus.
  setsearchBarFocus();
};

const processTheSearch = async function () {
  //  clear the stats line
  clearStateLine();

  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;

  const resultArray = await returnSearchResults(searchTerm);
  if (resultArray.length) buildSearchResults(resultArray);
  setStateLine(resultArray.length);
};

// "readyStateChange"  = readystatechange event is triggered on the document whenever the readyState changes . readyState property, which can have the following values:
//  1) laoding: the event is still loading. 2) interactive: the document has finished loading , but sub resources like images, stylesheets, and scripts are still being loading. 3) complete: the document  and all its resources are fully loaded.
