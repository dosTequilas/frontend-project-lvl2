import { Command } from 'commander/esm.mjs';
const program = new Command();

program.option('-V, --version', 'output the version number');
program.option('-h, --help', 'output usage information');
program.version('0.0.0');
// program.argument('file1', 'file2');

program.parse(process.argv);

const options = program.opts();
if (options.version) console.log(`- ${options.version}`);
if (options.help)
  console.log(
    '\n' +
      'Usage: gendiff [options]' +
      '\n' +
      '\n' +
      'Compares two configuration files and shows a difference' +
      '\n' +
      '\n' +
      'Options:' +
      '\n' +
      '-V, --version    output the version number' +
      '\n' +
      '-h, --help       output usageinformation'
  );
