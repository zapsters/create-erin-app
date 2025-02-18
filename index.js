#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const giftBase64 = require("./data.js");

const app = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
});

console.log("Welcome to Create-Erin-App");

app.question("Name of project: ", function (projectName) {
  const projectDirectory = path.resolve(process.cwd(), projectName);
  const functionsDirectory = path.join(projectDirectory, "functions");
  const readmeFile = path.join(projectDirectory, "readme.md");

  if (fs.existsSync(path.join(projectDirectory, "index.js"))) {
    quitApp();
    console.log("== ERROR ==");
    console.log("A project already exists at this location! Aborting.");

    return;
  }

  const distDirectory = path.join(projectDirectory, "dist");
  const srcDirectory = path.join(projectDirectory, "src");
  const giftDirectory = path.join(projectDirectory, "gift.gif");

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
  }
  if (!fs.existsSync(distDirectory)) {
    fs.mkdirSync(distDirectory);
  }
  if (!fs.existsSync(srcDirectory)) {
    fs.mkdirSync(srcDirectory);
  }

  app.question("Include a functions directory? (Y/n): ", function (response) {
    if (response.toUpperCase() == "Y") {
      if (!fs.existsSync(functionsDirectory)) {
        fs.mkdirSync(functionsDirectory);
      }
      const webfileLibRef = path.join(__dirname, "lib/webfile.txt");
      fs.writeFileSync(path.join(functionsDirectory, "webfile.js"), fs.readFileSync(webfileLibRef));

      const readmeFile = path.join(projectDirectory, "readme.md");
      fs.writeFileSync(readmeFile, `## ${projectName} \n\n Created with Create-Erin-App`);
    }

    fs.writeFileSync(path.join(projectDirectory, "index.js"), `// Project ${projectName}`);

    app.question(
      "Do you want a special gift included with your project? (Y/n): ",
      function (response) {
        if (response.toUpperCase() == "Y") {
          var buf = Buffer.from(giftBase64, "base64");
          fs.writeFileSync(giftDirectory, buf, console.log("worked"));

          console.log("\nGift Included. ⊂◉‿◉つ\n");
        } else {
          console.log("\n Gift Denied. (˃̣̣̥⌓˂̣̣̥⋆) \n");
        }
        quitApp();
      }
    );
  });
});

function quitApp() {
  app.close();
}
