import { setItem, getItem } from "./LocalStorage.js";

export class SearchInput {
  constructor({ $target, onSearch }) {
    this.onSearch = onSearch;
    this.$target = $target;
    this.latestSearched = getItem("key") || [];

    const input = document.createElement("input");
    input.placeholder = "고양이를 검색해보세요 :)";
    input.autofocus = true;
    input.className = "SearchInput";
    $target.appendChild(input);
    $target.innerHTML += `
      <ul class="searchedList"></ul>
    `;
    this.printLatestSearch();

    const $searchInput = document.querySelector(".SearchInput");
    $searchInput.addEventListener("click", () => {
      $searchInput.value = "";
    });

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch($searchInput.value);
        this.addLatestSearched($searchInput.value);
      }
    });
  }

  addLatestSearched(keyword) {
    if (this.latestSearched.length >= 5) {
      this.latestSearched.shift(); // 배열 첫번째 요소 제거
    }
    this.latestSearched.push(keyword);
    setItem("key", this.latestSearched);

    this.printLatestSearch();
  }

  printLatestSearch() {
    const ul = document.querySelector(".searchedList");
    ul.innerHTML = "";
    for (const keyword of this.latestSearched) {
      ul.innerHTML += `
        <li class="searched-item">
          <div class="keyword">${keyword}</div>
          <div class="delete-keyword">X</div>
        </li>
      `;
    }
  }
}
