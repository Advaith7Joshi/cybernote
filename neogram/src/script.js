import { dialog } from '@tauri-apps/api/dialog';
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';

const themes = [
  "ultraviolet", "crimson", "subzero", "vaporwave", "after_eight", "hackerman",
  "purple_haze", "coming_soon", "pay2win", "lambda", "frutti",
  "rose_quartz", "white_wolf", "contramk1",
];

let theme_count = 0;
const editor = document.getElementById("editor");
const root = document.documentElement;
const helpBtn = document.getElementById("helpBtn");
const helpPanel = document.getElementById("helpPanel");

function applyTheme(index) {
  const theme = themes[index % themes.length];
  root.setAttribute("data-theme", theme);
  localStorage.setItem("neonote_theme", index);
}

helpBtn?.addEventListener("click", () => {
  helpPanel?.classList.toggle("hidden");
});

editor?.addEventListener("input", () => {
  localStorage.setItem("neonote-note", editor.value);
});

window.onload = () => {
  theme_count = parseInt(localStorage.getItem("neonote_theme")) || 0;
  applyTheme(theme_count);
  editor.value = localStorage.getItem("neonote-note") || "";
};

window.addEventListener("beforeunload", () => {
  localStorage.setItem("neonote-note", editor.value);
});

async function saveToFile() {
  const path = await dialog.save({
    filters: [{ name: "Text Files", extensions: ["txt"] }],
  });
  if (path) {
    await writeTextFile(path, editor.value);
    alert("Saved to file!");
  }
}

async function openFromFile() {
  const selected = await dialog.open({
    filters: [{ name: "Text Files", extensions: ["txt"] }],
  });
  if (selected) {
    const content = await readTextFile(selected);
    editor.value = content;
    localStorage.setItem("neonote-note", content);
  }
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

console.log("NeoNote loaded.");
console.log("Ctrl+S = Save, Ctrl+O = Open, Shift+Tab = Cycle Themes");
