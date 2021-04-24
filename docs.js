const jsdoc = require('jsdoc-to-markdown');
const fs = require('fs');

const classes = [];
const output = {};

const jsonData = jsdoc.getTemplateDataSync({
  files: 'lib/**/**.js'
});

for (const dataObj of jsonData)
  if (dataObj.kind === 'class')
    classes.push(dataObj);

for (const dClass of classes) {
  const methods = jsonData.filter(d => d.id.startsWith(dClass.id) && (d.kind === 'constructor' || d.kind === 'function'));
  output[dClass.name] = [dClass, ...methods];
}

for (const k of Object.keys(output))
  fs.writeFileSync('docs/' + k + '.json', JSON.stringify(output[k], '', 2));
