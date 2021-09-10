const config = require('./webpack.config.js');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');

// let clientItem = process;
// if (!["pc", "app"].includes(process.argv[2] || "null")) {
//   console.log(chalk.red.bold('请输入！\n  例：npm run create app/pc 模块名'))
//   return;
// }

if (!process.argv[2]) {
  console.log(chalk.red.bold('请输入模块名！'))
  return;
}

let entryPath = `${config.root}\\src\\client\\${process.argv[2]}\\`.replace(/[\\]/g, '/');
let fromFile = `${config.root}\\webpack\\demo`;

if (config.isFile(entryPath)) {
  console.log(chalk.red.bold(`您输入的模块名已存在！`));
  return;
}

inquirer.prompt([{
  type: 'confirm',
  name: 'create',
  message: `确认创建 ${process.argv[2]} 模块?`,
  default: true
}]).then((e) => {
  if (e.create) {
    fs.mkdir(entryPath);
    fs.copy(fromFile, entryPath, function (e) {
      console.log(chalk.yellowBright.bold(`模块创建成功 启动模块为：npm run dev ${process.argv[2]}`));
    });
  }
})