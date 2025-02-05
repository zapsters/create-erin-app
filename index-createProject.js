#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const readline = require("readline");
const gift = require("readline");

const app = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
});

app.question("Name of project:", function (projectName) {
  console.log(process.cwd());

  const projectDirectory = path.resolve(process.cwd(), projectName);
  const functionsDirectory = path.join(projectDirectory, "functions");
  const readmeFile = path.join(projectDirectory, "readme.md");

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
  }
  if (!fs.existsSync(functionsDirectory)) {
    fs.mkdirSync(functionsDirectory);
  }

  fs.writeFileSync(readmeFile, "## Project Name");

  app.close();
});
