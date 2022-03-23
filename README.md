### Hexlet tests and linter status:

[![Actions Status](https://github.com/dosTequilas/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/dosTequilas/frontend-project-lvl2/actions)
[![Node CI](https://github.com/dosTequilas/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/dosTequilas/frontend-project-lvl2/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cb2df4b06f0c7515ff59/test_coverage)](https://codeclimate.com/github/dosTequilas/frontend-project-lvl2/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/cb2df4b06f0c7515ff59/maintainability)](https://codeclimate.com/github/dosTequilas/frontend-project-lvl2/maintainability)


<h1 align="center">
  <img src="https://freepikpsd.com/file/2019/11/difference-1-Transparent-Images.jpg" width="224px"/><br/>
  Difference finder
</h1>

<p align="center">Try this simple tool for comparing the json and yaml files, powered by <b>Node.js</b> by running one CLI command! 
This package includes 3 types of formatters, it is very simple and easy for use!

## ⚡️ Quick start

First of all, clone this repository.

```bash
git clone https://github.com/dosTequilas/frontend-project-lvl2
```

Then go to the project directory.

```bash
cd frontend-project-lvl2
```

Next, run the command.

```bash
./bin/gendiff.js -h
```


## ⚙️ Usage

### `Help`

After launching the command above, you will see the reference info.

There are a few options:

```bash
./bin/gendiff.js -V
```
Will output the version number.


```bash
./bin/gendiff.js -H
```
Will display help for commmand.


```bash
./bin/gendiff.js -f
```
Will output the format type, you can choose the formatter type: stylish, plain or JSON.


### `Stylish`

This formatter will show the whole structure of a file with '+' or '-' signs in each difference case.

Launch command with included fixtures to check it:

```bash
make genStylish
```

### `Plain`

This formatter will show each difference case in a single line, discribing the difference.

Launch command (with fixtures):

```bash
make genPlain
```

### `JSON`

Sometimes we need the raw tree to check, JSON formatter will show you the difference in JSON format.

Launch command (with fixtures):

```bash
make genJson
```


## ⭐️ Project assistance

If you want to say **thank you** or/and support active development of a `Difference finder`, just add a [GitHub Star](https://github.com/dosTequilas/frontend-project-lvl2) to the project.

Together, we can make this project **better** every day! 