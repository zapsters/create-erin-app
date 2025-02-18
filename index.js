#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const readline = require("readline");

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

  createPrompt(
    "Include a functions directory?",
    function () {
      if (!fs.existsSync(functionsDirectory)) {
        fs.mkdirSync(functionsDirectory);
      }
      const webfileLibRef = path.join(__dirname, "lib/webfile.txt");
      fs.writeFileSync(path.join(functionsDirectory, "webfile.js"), fs.readFileSync(webfileLibRef));
    },
    function () {},
    function () {
      const readmeFile = path.join(projectDirectory, "readme.md");
      fs.writeFileSync(readmeFile, `## ${projectName} \n\n Created with Create-Erin-App`);

      fs.writeFileSync(path.join(projectDirectory, "index.js"), `// Project ${projectName}`);

      createPrompt(
        "Do you want a special gift included with your project?",
        function () {
          const giftLibRef = path.join(__dirname, "lib/gift.gif");
          fs.writeFileSync(path.join(projectDirectory, "gift.gif"), fs.readFileSync(giftLibRef));

          console.log("\nGift Included. ⊂◉‿◉つ\n");
        },
        function () {
          console.log("\n Gift Denied. (˃̣̣̥⌓˂̣̣̥⋆) \n");
        },
        function () {
          quitApp();
        }
      );
    }
  );
});

function quitApp() {
  app.close();
}

function createPrompt(text, callbackConfirm, callbackDeny, callbackAfter) {
  app.question(`${text} (Y/n): `, function (response) {
    if (response.toUpperCase() == "Y") {
      callbackConfirm();
      callbackAfter();
    } else if (response.toUpperCase() == "N") {
      callbackDeny();
      callbackAfter();
    } else {
      createGiftPrompt(callback);
    }
  });
}
