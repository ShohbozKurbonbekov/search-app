export function getSearchTerm() {
  const rawSearchItem = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchItem = rawSearchItem.replaceAll(regex, " ");
  return searchItem;
}

export const returnSearchResults = async function (searchItem) {
  const wikiSearchString = getWikiSearchString(searchItem);
  const wikiSearchResults = await requestData(wikiSearchString);

  console.log(wikiSearchResults.query);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

const getWikiSearchString = function (searchItem) {
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchItem}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const getMaxChars = function () {
  const width = window.innerWidth || document.body.clientWidth;
  let MaxChars;
  if (width < 414) MaxChars = 65;
  if (width >= 414 && width < 1400) MaxChars = 100;
  if (width >= 1400) MaxChars = 130;
  return MaxChars;
};

const requestData = async function (searchString) {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const processWikiResults = (results) => {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty("thumbnail")
      ? results[key].thumbnail.source
      : null;

    const item = {
      id,
      title,
      img,
      text,
    };

    resultArray.push(item);
  });

  return resultArray;
};

// one of the regular expression parts: "/[ ]{2,}/gi". 1) [ ]: This matches a space character. In this case, it's inside square brackets (a character class), but it's equivalent to just using a space outside the brackets (i.e., / {2,}/gi). The space inside [ ] is redundant here but still works. 2) {2,}: This is a quantifier that matches two or more occurrences of the preceding element (which is a space in this case). So, this part ensures that the regular expression matches at least two consecutive spaces. 3) g (global flag): This makes the regular expression search for all matches in the string, not just the first one. 4) i (case-insensitive flag): This makes the matching case-insensitive, but since we're only dealing with spaces, this flag is unnecessary in this case.
// "window.innerWidth" =  is a property in JavaScript that returns the width of the viewport (i.e., the visible part of the browser window). This value includes the width of the content visible in the window, but it does not include scrollbars, toolbars, or window borders.
// "element.clientWidth"  = is a property in JavaScript that returns the inner width of an element in pixels, including its padding but excluding the borders, margins, and scrollbars (if any).
// "encodeURi()" = The encodeURI() method in JavaScript is used to encode a Uniform Resource Identifier (URI). It ensures that the URI can be safely transmitted over the internet by escaping certain characters, such as spaces, that would otherwise be misinterpreted in a URL. However, it does not escape characters that are valid in a URI, such as :, /, ?, and &.
