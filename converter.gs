/**
 * The event handler triggered when opening the spreadsheet.
 * @param {Event} e The onOpen event.
 * @see https://developers.google.com/apps-script/guides/triggers#onopene
 */
function onOpen(e) {
  // Add a custom menu to the spreadsheet.
  SpreadsheetApp.getUi()
      .createMenu('Plist')
      .addItem('Export', 'to')
      .addToUi();
}

function to() {
  var spreadsheet = SpreadsheetApp.getActive();
  // var spreadsheet = SpreadsheetApp.openById('1pyJvR8B76nAZIp2p1S5GwM0xJUvuNaJShepLesBxRFQ');
  var name = spreadsheet.getName();
  var values = spreadsheet.getDataRange()
      .getValues();
  var result = plist(values);
  console.log(result);
  save(result, name+'.plist');
}

function plist(values) {
  var properties = values.shift()
      .map(str=>str.split(":"));
  var result = '';
  for (var i = 0; i < values.length; i++) {
    result += '\t\t<dict>\n';
    for (var j = 0; j < values[i].length; j++) {
      result += '\t\t\t<key>'+properties[j][0]+'</key>\n';
      result += print(properties[j][1], values[i][j], 3);
    }
    result += '\t\t</dict>\n';
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <array>
  ${result}
  </array>
</plist>`;
}

function print(type, value, shift) {
  if (type.startsWith('[')) {
    var subType = type.substr(1, 1);
    return '\t'.repeat(shift)+'<array>\n'+
        value.split(',')
          .map(subValue=>print(subType, subValue, shift+1))
          .join('')+
        '\t'.repeat(shift)+'</array>\n';
  }
  switch (type) {
    case 'Int':
      return printf('integer', value, shift);
    case 'Float', 'Double':
      return printf('real', value, shift);
    case 'Bool':
      return '\t'.repeat(shift)+'<'+value+'/>\n';
    default:
      return printf('string', value, shift);
  }
}

function printf(type, value, shift) {
  return '\t'.repeat(shift)+'<'+type+'>'+value+'</'+type+'>\n';
}

function save(content, name) {
  var template = HtmlService.createTemplateFromFile('save');
  template.name = name;
  template.content = content;

  var html = template.evaluate()
    .setWidth(250).setHeight(100);
  SpreadsheetApp.getUi()
    .showModalDialog(html, "Download file ...");
}
