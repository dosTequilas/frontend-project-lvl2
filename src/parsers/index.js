import yaml from 'js-yaml';

const parse = (data, fileExt) => {
  let parser;

  if (fileExt === '.json') {
    parser = JSON.parse;
  } else if (fileExt === '.yml') {
    parser = yaml.load;
  }

  return parser(data);
};
export default parse;
