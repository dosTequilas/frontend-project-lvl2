import yaml from 'js-yaml';

function parse(data, fileType) {
  if (fileType === 'json') {
    return JSON.parse(data);
  }
  if (fileType === 'yml') {
    return yaml.load(data);
  }
  return null;
}

export default parse;
