import { setItem, getItem } from "../utils/LocalStorage.js";

export class SearchInput {
  constructor({ $target, onSearch }) {
    this.isRandom = false;
    this.onSearch = onSearch;
    this.keywords = getItem("key") || [];
    this.section = document.createElement("section");
    this.section.className = "search-section";
    $target.appendChild(this.section);

    this.inputSection = document.createElement("section");
    this.inputSection.className = "input-section";
    this.SearchInput = document.createElement("input");
    this.SearchInput.placeholder = "고양이를 검색해보세요 :)";
    this.SearchInput.autofocus = true;
    this.SearchInput.className = "search-input";
    this.randomButton = document.createElement("button");
    this.randomButton.className = "random-btn";
    this.randomButton.innerHTML = "random";

    this.inputSection.appendChild(this.SearchInput);
    this.inputSection.appendChild(this.randomButton);

    this.render();
  }

  addKeyword(keyword) {
    if (this.keywords.includes(keyword)) return;
    if (this.keywords.length == 5) this.keywords.shift();
    this.keywords.push(keyword);
    setItem("key", this.keywords);
    this.paintKeyword();
  }

  paintKeyword() {
    this.section.innerHTML = "";

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
      keywords.addEventListener("click", () => {
        this.onSearch(keyword, false);
        this.SearchInput.value = keyword;
      });
      recentKeywords.appendChild(keywords);
    });

    this.section.appendChild(this.inputSection);
    this.section.appendChild(recentKeywords);
  }

  render() {
    this.SearchInput.addEventListener("click", () => {
      this.SearchInput.value = "";
    });

    this.SearchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13 && this.SearchInput.value !== "") {
        this.onSearch(this.SearchInput.value, false);
        this.addKeyword(this.SearchInput.value);
      }
    });

    this.randomButton.addEventListener("click", () => {
      this.onSearch(null, true);
    });

    this.paintKeyword();
  }
}
