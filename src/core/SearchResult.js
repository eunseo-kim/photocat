export class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    const article = document.createElement("section");
    article.className = "search-section";
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    article.appendChild(this.$searchResult);
    $target.appendChild(article);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
            <li class="item">
              <img src=${cat.url} alt=${cat.name} />
            </li>
          `
      )
      .join("");

    this.$searchResult.querySelectorAll("li").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });
  }
}
