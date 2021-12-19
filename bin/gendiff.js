import { Command } from 'commander/esm.mjs';
const program = new Command();

program.description('Compares two configuration files and shows a difference.');
program.version('0.0.0');
// program.argument('file1', 'file2');

program.parse();
