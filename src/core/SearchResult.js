export class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, onClick }) {
    const article = document.createElement("section");
    article.className = "result-section";
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
    this.lazyLoading();
  }

  lazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    const lazyloadImages = document.querySelectorAll(".lazy");
    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
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
              <img class="lazy" data-src="${cat.url}" alt="" />
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
