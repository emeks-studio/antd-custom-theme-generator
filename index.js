#!/usr/bin/env node
const fs = require("fs");
const less = require("less");
const argv = require("minimist")(
  process.argv.slice(2),
  {alias: {"verbose": ["v"]}}
);

const DEFAULTS = {
  verbose: false,
  in: "./custom-theme.less",
  out: "./custom-theme.css",
  antd: "./node_modules/antd",
  theme: "default"
};

const verbose = argv["verbose"] || DEFAULTS.verbose;
const inFilePath = argv._[0] || DEFAULTS.in;
const outFilePath = argv._[1] || DEFAULTS.out;
const antdLibPath = argv["antd"] || DEFAULTS.antd;
const theme = argv["theme"] || DEFAULTS.theme;

verbose && console.debug(`
\x1b[34m[Params]\x1b[0m
  Args:
    verbose: ${argv["verbose"] || ''}
    antd: ${argv['antd'] || ''}
    theme: ${argv['theme'] || ''}
    in: ${argv._[0] || ''}
    out: ${argv._[1] || ''}
  CWD: ${process.cwd()}
  __dirname: ${__dirname}

\x1b[34m[Vars]\x1b[0m
  customTheme: ${inFilePath}
  generatedTheme: ${outFilePath}
  antdLib: ${antdLibPath}
  theme: ${theme}

Generating theme...
`);

const imports = [
  `@import url('${antdLibPath}/lib/style/themes/${theme}.less');`,
  `@import url('${antdLibPath}/dist/antd.less');`,
  `@import url('${inFilePath}');`
].join('');

less.render(imports, {javascriptEnabled: true})
.then(
  ({css}) => {
    try {
      fs.writeFileSync(outFilePath, css);
      console.log(`AntDesign theme (${outFilePath}) successfully generated.`);
    } catch(e) {
      console.error(`Could not write into file (${outFilePath}):`, e);
    }
  },
  (error) => console.error(error)
);
