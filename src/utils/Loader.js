export default class Loader {
  constructor($target, isLoading) {
    const template = `
        <div class="loading-wrapper">
            <div id="loading"></div>
            <p>please wait...</p>
        </div>
    `;
    $target.innerHTML += template;
    this.isLoading = isLoading;
    this.render();
  }

  setState(nextLoading) {
    this.isLoading = nextLoading;
    this.render();
  }

  render() {
    const loadingWrapper = document.querySelector(".loading-wrapper");
    if (this.isLoading) {
      loadingWrapper.style.display = "block";
    } else {
      loadingWrapper.style.display = "none";
    }
  }
}
