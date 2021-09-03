export class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("article");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeModal() {
    const ImageInfo = document.querySelector(".ImageInfo");
    ImageInfo.style.display = "none";
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
          <div class="overlay"></div>
          <div class="content-wrapper">
            <article class="title">
              <p>${name}</p>
              <button type="button" class="close">x</button>
            </article>
            <img src="${url}" alt="${name}"/>        
            <article class="description">
              <p>성격: ${temperament}</p>
              <p>태생: ${origin}</p>
            </article>
          </div>`;
      this.$imageInfo.style.display = "block";

      const overlay = document.querySelector(".overlay");
      const closeButton = document.querySelector(".close");
      overlay.addEventListener("click", () => {
        this.closeModal();
      });
      closeButton.addEventListener("click", () => {
        this.closeModal();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
