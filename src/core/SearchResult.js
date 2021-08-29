export class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("article");
    this.$searchResult.className = "SearchResult";
    const ul = document.createElement("ul");
    ul.className = "card-list";
    this.$searchResult.appendChild(ul);
    $target.appendChild(this.$searchResult);

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
