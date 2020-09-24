#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");
const verbose = process.argv[2] === "verbose";

const scriptParams = {
  "process.argv": process.argv,
  "process.cwd()": process.cwd(),
  __dirname: __dirname,
};
if (debug) {
  console.debug("Script params");
  console.debug(scriptParams);
}

const initialPosition = verbose ? 3 : 2;
const scriptVariables = {
  customThemeFilePath: path.join(
    process.cwd(),
    process.argv[initialPosition] || "./custom-theme.less"
  ),
  generatedThemeFilePath: path.join(
    process.cwd(),
    process.argv[initialPosition + 1] || "./custom-theme.css"
  ),
  antdLibraryPath: path.join(
    process.cwd(),
    process.argv[initialPosition + 2] || "./node_modules/antd"
  ),
};

if (debug) {
  console.log("Script variables");
  console.log(scriptVariables);
}

const content = `
  @import url("${scriptVariables.antdLibraryPath}/lib/style/themes/default.less");
  @import url("${scriptVariables.antdLibraryPath}/dist/antd.less");
  @import url("${scriptVariables.customThemeFilePath}");
`;
console.debug(
  'About to generate "/tmp/generated-theme.less" tmp file:',
  content
);

exec(
  `echo "${content}" > /tmp/generated-theme.less`,
  { cwd: process.cwd() },
  (error1, stdout, stderr) => {
    if (!error1) {
      if (debug) {
        console.debug(
          `Dynamic generation: "/tmp/generated-theme.less" tmp file was successfully generated`
        );
      }
      exec(
        `node_modules/less/bin/lessc --js /tmp/generated-theme.less ${scriptVariables.generatedThemeFilePath}`,
        { cwd: __dirname },
        (error2, stdout, stderr) => {
          if (!error2) {
            if (debug) {
              console.log(
                `Finally: "${scriptVariables.generatedThemeFilePath}" was successfully generated`
              );
            } else {
              console.debug(
                `AntDesign file (${scriptVariables.generatedThemeFilePath}) was successfully generated`
              );
            }
          } else {
            console.error(error2);
          }
        }
      );
    } else {
      console.error(error1);
    }
  }
);
