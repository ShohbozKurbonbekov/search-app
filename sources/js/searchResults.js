export const deleteSearchResults = function () {
  const parentElement = document.getElementById("searchResults");
  let child = parentElement.lastElementChild;

  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const buildSearchResults = function (dataArray) {
  dataArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContents = document.createElement("div");
    resultContents.setAttribute("class", "resultContents");

    if (result.img) {
      const resultImage = createResultImage(result);
      resultContents.append(resultImage);
    }

    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);
    const searchResults = document.getElementById("searchResults");
    searchResults.append(resultItem);
  });
};

const createResultItem = function (result) {
  const resultItem = document.createElement("div");
  resultItem.setAttribute("class", "resultItem");
  const resultTitle = document.createElement("div");
  resultTitle.setAttribute("class", "resultTitle");
  const link = document.createElement("a");
  link.setAttribute("href", `https://en.wikipedia.org/?curid=${result.id}`);
  link.setAttribute("target", "_blank");
  link.textContent = result.title;
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
};

const createResultImage = function (result) {
  const resultImage = document.createElement("div");
  resultImage.setAttribute("class", "resultImage");
  const img = document.createElement("img");
  img.setAttribute("src", result.img);
  img.setAttribute("alt", result.title);
  resultImage.append(img);
  return resultImage;
};

const createResultText = function (result) {
  const resultText = document.createElement("div");
  resultText.setAttribute("class", "resultText");
  const resultDescription = document.createElement("p");
  resultDescription.setAttribute("class", "resultDescription");
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
};

export const clearStateLine = () => {
  document.getElementById("stats").textContent = "";
};

export const setStateLine = function (numberOfResults) {
  const stateLine = document.getElementById("stats");
  if (numberOfResults) {
    stateLine.textContent = `Displaying ${numberOfResults} results`;
  } else {
    stateLine.textContent = `Sorry, no results`;
  }
};

// "lastElementChild" = The Element.lastElementChild read-only property returns an element's last child Element, or null if there are no child elements.
// "removeChild" = The removeChild() method of the Node interface removes a child node from the DOM and returns the removed node.
