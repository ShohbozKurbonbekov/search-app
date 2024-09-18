export function setsearchBarFocus() {
  document.getElementById("search").focus();
}

export const showClearButton = function () {
  const searchInput = document.getElementById("search");
  const clearButton = document.getElementById("clear");
  if (searchInput.value.length > 0) {
    clearButton.classList.remove("none");
    clearButton.classList.add("flex");
  } else {
    clearButton.classList.remove("flex");
    clearButton.classList.add("none");
  }
};

export const clearSearchText = function (e) {
  e.preventDefault();
  document.getElementById("search").value = "";
  const clear = document.getElementById("clear");
  clear.classList.add("none");
  clear.classList.remove("block");
  setsearchBarFocus();
};

export const clearPushListener = (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();

    document.getElementById("clear").click();
  }
};

// "click()" = The click() function in JavaScript is used to simulate a mouse click on an element. It triggers the click event on the specified element, causing any attached event listeners to be executed.
