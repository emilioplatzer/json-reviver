# json-reviver
Universal JSON reviver

<!--multilang v0 en:README.md es:LEEME.md -->

![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![version](https://img.shields.io/npm/v/js-to-html.svg)](https://npmjs.org/package/json-reviver)
[![downloads](https://img.shields.io/npm/dm/json-reviver.svg)](https://npmjs.org/package/json-reviver)
[![linux](https://img.shields.io/travis/emilioplatzer/json-reviver/master.svg)](https://travis-ci.org/emilioplatzer/json-reviver)
[![coverage](https://img.shields.io/coveralls/emilioplatzer/json-reviver/master.svg)](https://coveralls.io/r/emilioplatzer/json-reviver)
[![climate](https://img.shields.io/codeclimate/github/emilioplatzer/json-reviver.svg)](https://codeclimate.com/github/emilioplatzer/json-reviver)
[![dependencies](https://img.shields.io/david/emilioplatzer/json-reviver.svg)](https://david-dm.org/emilioplatzer/json-reviver)

<!--multilang buttons-->

language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](LEEME.md)

<!--lang:en-->
## Install

<!--lang:es--]
## Instalación

[!--lang:*-->

```sh
$ npm install json-reviver
```

## USE

```js
var jsonReviver = require('json-reviver');

function AnimalClass(name, age){
    this._name=name;
    this._age=age;
    this._lives=true;
}

AnimalClass.prototype.resume = function(){
    return "I a'm an "+this.prototype.constructor.name+
        ', my name is '+this._name+
        ". I a'm "+this._age+" years all. "+(this._lives? " I feel good": "I'm death");
}

jsonReviver.register(AnimalClass);

var boby = new AnimalClass('boby', 5);

var txt = JSON.stringify(boby);

var clone = JSON.parse(txt, jsonReviver.reviver);

clone.resume(); // I a'm an AnimalClass, my name is boby...

jsonReviver.force(JSON); // force reviver in all calls

var direct = JSON.parse(txt); // reviver is implicit

direct.resume(); // I a'm an AnimalClass, my name is boby...

```

<!--lang:en-->
## License

<!--lang:es--]

## Licencias

[!--lang:*-->

[MIT](LICENSE)
