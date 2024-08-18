/**
 * This script is used to initialize the Mugen template after the repository has been created from the template.
 *
 * It will:
 * 1. Remove the apps content.
 * 2. Install dependencies.
 * 3. Remove itself.
 * 4. Clean git history.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const removeAppsContent = () => {
  const appsDir = path.join(__dirname, "apps");
  fs.readdirSync(appsDir).forEach((appDirectory) => {
    const appPath = path.join(appsDir, appDirectory);
    fs.rmSync(appPath, { recursive: true });
  });
};

const installDependencies = () => {
  execSync("pnpm install");
};

const removeInitScript = () => {
  fs.unlinkSync(__filename);
};

const cleanGitHistory = () => {
  execSync(
    "git filter-branch --index-filter 'git rm --cached --ignore-unmatch ./mugen-init.js ./apps/**' HEAD"
  );
};

cleanGitHistory();
removeAppsContent();
installDependencies();
removeInitScript();

console.log("Mugen template initialized successfully!");
