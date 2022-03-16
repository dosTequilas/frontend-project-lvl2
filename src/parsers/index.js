import yaml from 'js-yaml';

function parse(data, fileExt) {
  if (fileExt === '.json') {
    return JSON.parse(data);
  }
  if (fileExt === '.yml') {
    return yaml.load(data);
  }
  return null;
}

export default parse;
