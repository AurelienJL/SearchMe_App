import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";
import { getSearchTerm, retrieveSearchResult } from "./dataFunction.js";
import { deleteSearchResult, clearStatsLine, buildSearchResult, setStatsLine } from "./searchResults.js";

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //set the focus
    setSearchFocus();

    //listeners clear text
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);

    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener)

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
};

// Procedural "workflow" function
const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResult();

    //process the search
    processTheSearch();

    //set the focus
    setSearchFocus();
};

const processTheSearch = async () => {
    // clear the stats line
    clearStatsLine();

    const searchTerm = getSearchTerm();
    if (searchTerm === "") {
        return;
    }
    const resultArray = await retrieveSearchResult(searchTerm);
    if (resultArray.length > 0) {
        buildSearchResult(resultArray);
    }

    setStatsLine(resultArray.length);
};