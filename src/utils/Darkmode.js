const darkmodeBtn = document.getElementById("toggleBtn");
const darkmodeLabel = document.querySelector(".darkmode-btn label");

darkmodeBtn.addEventListener("click", (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("color-theme", "dark");
    darkmodeLabel.innerHTML = "🌞light mode";
  } else {
    document.documentElement.setAttribute("color-theme", "light");
    darkmodeLabel.innerHTML = "🌕dark mode";
  }
});
