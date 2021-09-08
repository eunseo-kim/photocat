export class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, onClick }) {
    const article = document.createElement("section");
    article.className = "search-section";
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    article.appendChild(this.$searchResult);
    $target.appendChild(article);

    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data) {
      this.$searchResult.innerHTML = `
      <section class="no-search">
        <i class="fas fa-cat"></i>
        <p>고양이를 검색해보세요</p>
      </section>
      `;

      return;
    } else {
      if (this.data.length > 0) {
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
      } else {
        this.$searchResult.innerHTML = `
        <section class="no-search">
          <i class="fas fa-box-open"></i>
          <p>일치하는 결과가 없네요</p>
        </section>
      `;
      }
    }
  }
}
