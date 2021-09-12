import { setItem, getItem } from "../utils/LocalStorage.js";

export class SearchInput {
  constructor({ $target, onSearch }) {
    this.onSearch = onSearch;
    this.keywords = getItem("key") || [];
    this.section = document.createElement("section");
    this.section.className = "search-section";
    $target.appendChild(this.section);
    this.render();
  }

  deleteKeyword(keyword) {
    this.keywords = this.keywords.filter((value) => {
      return value != keyword;
    });
    setItem("key", this.keywords);
  }

  addKeyword(keyword) {
    // 이미 최근 검색창에 포함되어 있는 검색어는 최근 검색어에 추가 X
    if (this.keywords.includes(keyword)) return;
    if (this.keywords.length == 5) this.keywords.shift();
    this.keywords.push(keyword);
    setItem("key", this.keywords);
    this.render();
  }

  render() {
    this.section.innerHTML = "";

    // 고양이 검색창
    const SearchInput = document.createElement("input");
    SearchInput.placeholder = "고양이를 검색해보세요 :)";
    SearchInput.autofocus = true;
    SearchInput.className = "search-input";

    SearchInput.addEventListener("click", () => {
      SearchInput.value = "";
    });

    SearchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.onSearch(SearchInput.value);
        this.addKeyword(SearchInput.value);
      }
    });

    // 최근 검색어 창
    const recentKeywords = document.createElement("section");
    recentKeywords.className = "recent-keywords";
    recentKeywords.innerHTML = "";
    const keywordText = document.createElement("span");
    keywordText.className = "keyword-text";
    keywordText.innerHTML = "최근검색어";
    recentKeywords.appendChild(keywordText);

    this.keywords.map((keyword) => {
      const keywords = document.createElement("div");
      keywords.className = "keyword-list";
      keywords.innerText = keyword;
      keywords.addEventListener("click", (e) => {
        if (e.target.className === "keyword-list") {
          SearchInput.value = keyword;
          this.onSearch(keyword);
        }
      });
      recentKeywords.appendChild(keywords);
    });

    this.section.appendChild(SearchInput);
    this.section.appendChild(recentKeywords);
  }
}
