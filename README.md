# Antd Static Theme Generator

[Ant Design](https://ant.design/) provides plenty of UI components, styled with [less](http://lesscss.org/). You can customize the default theme modifying less variable, to achive this you have multiple ways ([check the doc here](https://ant.design/docs/react/customize-theme)). The problem is that you don't have a simple way to create a static `css` file with zero configuration.

This project works with `Antd Design v4.3.5` and aims to simplify the customization of your theme if you don't want to install dependencies, configurate things like `less` or eject your [React](reactjs.org) project.

## Create static theme styles

Change the file `styles/custom-theme.less` with the variables that you want in your theme.

Run this command to obtain a `css` file:

```sh
$ npm run create-theme
```

Copy the file `styles/custom-theme.css` to your React project and instead of import `antd/dist/antd.css` file, import your new file `custom-theme.css` 
