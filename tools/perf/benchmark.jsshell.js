load('../../dist/bundle/tooling/l20n.js');

var ftlCode = read('./example.ftl');
var data = {
  "brandShortName": "BRANDSHORTNAME",
  "ssid": "SSID",
  "capabilities": "CAPABILITIES",
  "linkSpeed": "LINKSPEED",
  "pin": "PIN",
  "n": 3,
  "name": "NAME",
  "device": "DEVICE",
  "code": "CODE",
  "app": "APP",
  "size": 100,
  "unit": "UNIT",
  "list": "LIST",
  "level": "LEVEL",
  "number": "NUMBER",
  "link1": "LINK1",
  "link2": "LINK2",
  "count": 10,
};

function micro(time) {
  // time is in milliseconds with decimals
  return Math.round(time * 1000);
}

var times = {};

times.ftlParseStart = dateNow();
var [resource] = L20n.FTLASTParser.parseResource(ftlCode);
times.ftlParseEnd = dateNow();

times.ftlEntriesParseStart = dateNow();
var [entries] = L20n.FTLEntriesParser.parseResource(ftlCode);
times.ftlEntriesParseEnd = dateNow();

var bundle = new L20n.Bundle('en-US');
bundle.addMessages(ftlCode);

times.format = dateNow();
for (let [id] of bundle) {
  bundle.formatValue(id, data);
}
times.formatEnd = dateNow();

var results = {
  parseFTL: micro(times.ftlParseEnd - times.ftlParseStart),
  parseFTLEntries: micro(times.ftlEntriesParseEnd - times.ftlEntriesParseStart),
  format: micro(times.formatEnd - times.format),
};

print(JSON.stringify(results));
