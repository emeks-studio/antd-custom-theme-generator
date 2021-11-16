#!/usr/bin/env node
const fs = require("fs");
const less = require("less");
const watch = require("node-watch");
const argv = require("minimist")(
  process.argv.slice(2),
  {
    string: ['antd', 'theme'],
    boolean: ["verbose", "watch"],
    alias: {"verbose": ["v"], "watch": ["w"]},
  }
);

const DEFAULTS = {
  verbose: false,
  watch: false,
  in: "./custom-theme.less",
  out: "./custom-theme.css",
  antd: "./node_modules/antd",
  theme: "default"
};

const verbose = argv["verbose"] || DEFAULTS.verbose;
const shouldWatch = argv["watch"] || DEFAULTS.watch;
const inFilePath = argv._[0] || DEFAULTS.in;
const outFilePath = argv._[1] || DEFAULTS.out;
const antdLibPath = argv["antd"] || DEFAULTS.antd;
const theme = argv["theme"] || DEFAULTS.theme;

verbose && console.debug(`Verbose::
\x1b[34m[Params]\x1b[0m
  Args:
    verbose: ${argv["verbose"] || ''}
    watch: ${argv["watch"] || ''}
    antd: ${argv["antd"] || ''}
    theme: ${argv["theme"] || ''}
    in: ${argv._[0] || ''}
    out: ${argv._[1] || ''}
  CWD: ${process.cwd()}

\x1b[34m[Vars]\x1b[0m
  customTheme: ${inFilePath}
  generatedTheme: ${outFilePath}
  antdLib: ${antdLibPath}
  theme: ${theme}
`);

const imports = [
  `@import url('${antdLibPath}/lib/style/themes/${theme}.less');`,
  `@import url('${antdLibPath}/dist/antd.less');`,
  `@import url('${inFilePath}');`
].join('');

const compile = () => {
  console.log("Generating theme...");
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
};

compile();
if(shouldWatch){
  const watcher = watch(inFilePath, ()=> {
    console.log(`Watcher:: ${inFilePath} changed, recompiling.`);
    compile();
  });
  const closeWatcher = () => {
    console.log('Watcher:: Removing watcher...');
    watcher.close();
  };
  process.on('SIGTERM', closeWatcher);
  process.on('SIGINT', closeWatcher);
  process.on('SIGQUIT', closeWatcher);
};
