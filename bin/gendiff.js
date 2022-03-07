#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .action((filepath1, filepath2, options) => {
    const formatType = options.format;
    console.log(genDiff(filepath1, filepath2, formatType));
    console.log(options);
  })
  .option('-f, --format [type]', 'output format', 'stylish')
  .parse(process.argv);
