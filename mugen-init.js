/**
 * This script is used to initialize the Mugen template after the repository has been created from the template.
 *
 * It will:
 * 1. Clean git history.
 * 2. Install dependencies.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const installDependencies = () => {
  execSync("pnpm install");
};

const cleanGitHistory = () => {
  execSync(
    "git filter-branch --index-filter 'git rm --cached --ignore-unmatch ./mugen-init.js ./pnpm-lock.yaml ./apps/**' HEAD"
  );
  // Recreate the app directory and add a .gitkeep file
  fs.mkdirSync(path.join(__dirname, "apps"));
  fs.writeFileSync(path.join(__dirname, "apps/.gitkeep"), "");
};

const updateRepository = () => {
  execSync("git add .");
  execSync("git commit -m 'Initialize Mugen template'");
  execSync("git push --force origin master");
};

cleanGitHistory();
installDependencies();
updateRepository();

console.log("Mugen template initialized successfully!");
