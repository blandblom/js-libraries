# Util

Various utility methods broken into 4 groups; string, object, array, and uri.

I would suggest creating an 'app' utility for application specific helpers.


#### Usage:
```
var util = new Util();

util.str.isEmpty(string);
util.str.isNotEmpty(string);
util.str.capitalize(string);

util.obj.isNull(obj);
util.obj.isNotNull(obj);
util.obj.fromArray(array, namespace);

util.array.isEmpty(array);
util.array.isNotEmpty(array);
util.array.valuesFromObject(obj);
util.array.keyValuePairsFromObject(obj);

Array.prototype.reduce(util.array.sum);

util.uri.createPath(string, string, ...);
util.uri.createPath([string, string, ...], separator);

```
