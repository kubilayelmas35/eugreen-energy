const fs = require("fs");
const path = require("path");
const root = __dirname;
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "css", "styles.css"), "utf8");
const js =
  fs.readFileSync(path.join(root, "data", "locations.js"), "utf8") +
  fs.readFileSync(path.join(root, "js", "i18n.js"), "utf8") +
  fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
html = html.replace(
  '<link rel="stylesheet" href="css/styles.css" />',
  `<style>\n${css}\n</style>`
);
html = html.replace(
  /  <script src="data\/locations\.js"><\/script>\s*<script src="js\/i18n\.js"><\/script>\s*<script src="js\/app\.js"><\/script>/,
  `  <script>\n${js}\n  </script>`
);
fs.writeFileSync(path.join(root, "wix-embed.html"), html, "utf8");
console.log("wix-embed.html", html.length, "bytes");
