export default class DarkMode {
  constructor($target) {
    const template = `
      <div class="darkmode-btn">
        <input type="checkbox" id="toggleBtn" />
        <label for="toggleBtn"><i class="fas fa-moon"></i></label>
      </div>
    `;
    $target.innerHTML += template;
    this.render();
  }

  changeMode() {
    const DARK_MODE = "dark-mode";
    const LIGHT_MODE = "light-mode";
    const body = document.querySelector("body");
    if (body.classList.value === "") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body.classList.add(LIGHT_MODE);
      } else {
        body.classList.add(DARK_MODE);
      }
    } else {
      body.classList.toggle(LIGHT_MODE);
      body.classList.toggle(DARK_MODE);
    }
  }

  render() {
    const darkmodeBtn = document.querySelector("#toggleBtn");
    darkmodeBtn.addEventListener("click", () => {
      this.changeMode();
    });
  }
}
