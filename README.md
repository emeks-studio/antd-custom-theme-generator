# Antd custom theme generator

A simple way to create an antd theme css file with zero configuration.

[Ant Design](https://ant.design/) provides plenty of UI components, styled with less.
You can customize the default theme modifying less variables (check [their doc](https://ant.design/docs/react/customize-theme) for multiple ways to achieve this), but the main issue being that you don't have a simple way to create a static `.css` file with zero configuration.

This package was created with `Antd Design v4.6.6` and aims to ease the theme's customization process without having to install more dependencies yourself, set up [less](https://lesscss.org/) or eject your [React](reactjs.org) project.

## Usage

### Generate custom theme styles

1. Define your custom theme creating a `.less` file overriding Antd's variables (by default: `./custom-theme.less`).
   - _Example:_
     ```less
     @primary-color: #9063cd;
     @success-color: #a8d3c4;
     ```

2. Generate custom theme's `.css` file.
   - _Option A:_\
    Without installing this package:
     ```sh
     $ npx @emeks/antd-custom-theme-generator

     output > ./custom-theme.css
     ```
   - _Option B:_\
     Installing this package as a dev dependency:
     ```sh
     $ npm i -E --save-dev @emeks/antd-custom-theme-generator
     ```
     Then generating your theme:
     ```sh
     $ generate-theme

     default output > ./custom-theme.css
     ```
3. Replace `"antd/dist/antd.css"` import in your project, with the output file of your custom theme generated by this script (by default: `./custom-theme.css`).

### Options

| Name | Default | Description |
| --- | --- | --- |
| `--verbose` or `-v` | | Prints a little bit more info for debugging purposes |
| `--watch` or `-w` | | Keeps script running, recompile on `<customThemeFilePath>` change |
| `--antd` | ./node_modules/antd | Path to the antd library directory |
| `--theme` | default | Antd theme you want to use as base (e.g. `dark` or `compact`) - [Check available options](https://github.com/ant-design/ant-design/tree/master/components/style/themes) |
| `<customThemeFilePath>` | ./custom-theme.less | Path to the custom `.less` file with Antd variables overriden |
| `<generatedThemeFilePath>` | ./custom-theme.css | Output Path to the compiled `.css` file containing your new theme |

> **Notes**:\
> The order of paths **is** important.
```sh
  $ generate-theme [--verbose] [--watch] [--antd <dir>] [--theme <theme>] [<customThemeFilePath>] [<generatedThemeFilePath>]
```

#### Examples
- Generate a custom theme using dark theme as base:
  ```sh
  $ npx @emeks/antd-custom-theme-generator --theme dark
  ```
- Generate a custom theme using default theme as base specifying non default paths:
  ```sh
  $ npx @emeks/antd-custom-theme-generator ./styles/custom-theme.less ./styles/custom-theme.css
  ```

### FAQ
> **Q1: Which variables can I override?**

You may override any variable exposed by Antd in [this file](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less).

> **Q2: Should I run this command every time I change my `custom-theme.less` file?**

No, you could pass the `-w` argument to let the script observe `<customThemeFilePath>` file and recompile it if it changes.

## Development
- Inside package folder, link it globally:
  ```sh
  $ npm link
  ```
- Use the package in your project (with antd already installed and a `<customThemeFilePath>` file created as well):
  ```sh
  $ generate-theme
  ```

## TODO List:

- [x] Add hot-reload generation.
