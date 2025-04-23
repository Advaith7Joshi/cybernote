themes = [
  "ultraviolet",
  "crimson",
  "subzero",
  "vaporwave",
  "after_eight",
  "hackerman",
  "purple_haze",
  "coming_soon",
  "pay2win",
  "lambda",
  "frutti",
  "rose_quartz",
  "white_wolf",
  "contramk1",
];

let theme_count = 0;

const editor = document.getElementById("editor");
const root = document.documentElement;
const helpBtn = document.getElementById("helpBtn");
const helpPanel = document.getElementById("helpPanel");

function applyTheme(index) {
  const theme = themes[index % themes.length];
  root.setAttribute("data-theme", theme);
}

helpBtn.addEventListener("click", () => {
  helpPanel.classList.toggle("hidden");
});

window.onload = () => {
  theme_count = parseInt(localStorage.getItem("cybernote_theme")) || 0;
  applyTheme(theme_count);
  editor.value = localStorage.getItem("neonpad-note") || "";
};

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    localStorage.setItem("neonpad-note", editor.value);
    localStorage.setItem("cybernote_theme", theme_count);
    alert("Saved!");
  } else if (e.ctrlKey && e.key === "o") {
    e.preventDefault();
    const content = localStorage.getItem("neonpad-note");
    editor.value = content || "";
    alert(content ? "Loaded!" : "No saved note found.");
  } else if (e.shiftKey && e.key === "Tab") {
    e.preventDefault();
    theme_count = (theme_count + 1) % themes.length;
    applyTheme(theme_count);
  }
});

console.log("Advaith J.")