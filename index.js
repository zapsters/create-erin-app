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

  const viewsDirectory = path.join(projectDirectory, "views");

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
  }
  if (!fs.existsSync(viewsDirectory)) {
    fs.mkdirSync(viewsDirectory);
  }

  fs.writeFileSync(
    path.join(viewsDirectory, "index.html"),
    fs.readFileSync(path.join(__dirname, "lib/index.txt"))
  );
  fs.writeFileSync(
    path.join(viewsDirectory, "404.html"),
    fs.readFileSync(path.join(__dirname, "lib/404.txt"))
  );

  createPrompt(
    "Include a functions directory?",
    function () {
      if (!fs.existsSync(functionsDirectory)) {
        fs.mkdirSync(functionsDirectory);
      }

      const webfileLibRef = path.join(__dirname, "lib/webfile.txt");
      fs.writeFileSync(path.join(functionsDirectory, "webfile.js"), fs.readFileSync(webfileLibRef));
      console.log("\nFunction Folder Included. ⊂◉‿◉つ\n");
    },
    function () {
      console.log("\n Function Folder Denied. (˃̣̣̥⌓˂̣̣̥⋆) \n");
    },
    function () {
      const readmeFile = path.join(projectDirectory, "readme.md");
      fs.writeFileSync(
        readmeFile,
        `## ${projectName} \n\n ### Live Link \n [Home Page](https://google.com) \n\n TODO: add node/nodemon server.js to package.json scripts \n\n Created with Create-Erin-App `
      );
      const githubLibRef = path.join(__dirname, "lib/gitignore.txt");
      const gitIgnoreFile = path.join(projectDirectory, ".gitignore");
      fs.writeFileSync(gitIgnoreFile, fs.readFileSync(githubLibRef));

      const serverLibRef = path.join(__dirname, "lib/server.txt");
      fs.writeFileSync(path.join(projectDirectory, "server.js"), fs.readFileSync(serverLibRef));

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
    if (response.toUpperCase() == "N") {
      callbackDeny();
      callbackAfter();
    } else {
      callbackConfirm();
      callbackAfter();
    }
  });
}
