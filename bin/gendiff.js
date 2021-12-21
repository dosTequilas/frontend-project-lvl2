import { Command } from 'commander/esm.mjs';
const program = new Command();

program.description('Compares two configuration files and shows a difference.');
program.version('0.0.0');
program.option('-f, --format [type]', 'output format');
program.arguments('<filepath1> <filepath2>');

program.parse();
