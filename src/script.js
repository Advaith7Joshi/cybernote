const themes = [
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
let dialog = null;
let fs = null;

try {
  const electron = require("electron");
  dialog = electron.remote.dialog;
  fs = require("fs");
} catch (e) {
  console.warn("Electron not detected. File operations disabled.");
}

const editor = document.getElementById("editor");
const root = document.documentElement;
const helpBtn = document.getElementById("helpBtn");
const helpPanel = document.getElementById("helpPanel");

function applyTheme(index) {
  const theme = themes[index % themes.length];
  root.setAttribute("data-theme", theme);
  localStorage.setItem("cybernote_theme", index);
}

helpBtn.addEventListener("click", () => {
  helpPanel.classList.toggle("hidden");
});

editor.addEventListener("input", () => {
  localStorage.setItem("neogram-note", editor.value);
});

window.onload = () => {
  theme_count = parseInt(localStorage.getItem("cybernote_theme")) || 0;
  applyTheme(theme_count);

  editor.value = localStorage.getItem("neogram-note") || "";
};

window.addEventListener("beforeunload", () => {
  localStorage.setItem("neogram-note", editor.value);
});

function saveToFile() {
  if (!dialog || !fs) {
    alert("Saving to file is only supported in the Electron version.");
    return;
  }

  dialog
    .showSaveDialog({
      filters: [{ name: "Text Files", extensions: ["txt"] }],
    })
    .then((result) => {
      if (!result.canceled) {
        fs.writeFileSync(result.filePath, editor.value);
        alert("Saved to file!");
      }
    });
}

function openFromFile() {
  if (!dialog || !fs) {
    alert("Opening files is only supported in the Electron version.");
    return;
  }

  dialog
    .showOpenDialog({
      filters: [{ name: "Text Files", extensions: ["txt"] }],
      properties: ["openFile"],
    })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const content = fs.readFileSync(result.filePaths[0], "utf8");
        editor.value = content;
        localStorage.setItem("neogram-note", content);
      }
    });
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    saveToFile();
  } else if (e.ctrlKey && e.key === "o") {
    e.preventDefault();
    openFromFile();
  } else if (e.shiftKey && e.key === "Tab") {
    e.preventDefault();
    theme_count = (theme_count + 1) % themes.length;
    applyTheme(theme_count);
  }
});

console.log("Cybernote loaded.");
console.log("Press Ctrl+S to save, Ctrl+O to open, and Shift+Tab to change theme.");
console.log("Advaith J.");
