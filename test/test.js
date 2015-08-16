"use strict";

var expect = require('expect.js');
var jsonReviver = require('..');

describe('json-reviver', function(){
    describe('simple case for objects without private members', function(){
        function AnimalClass(name, age){
            this._name=name;
            this._age=age;
            this._lives=true;
        }
        AnimalClass.prototype.resume = function(){
            return "I'm a "+this.constructor.name+
                ' my name is '+this._name+
                ". I'm "+this._age+" years all. "+(this._lives? " I feel good": "I'm death");
        }
        jsonReviver.register(AnimalClass);
        it('add toJson to class', function(){
            var a=new AnimalClass('bob',4);
            var j1=a.toJSON();
            var j2=JSON.stringify(a);
            expect(j1).to.eql({
                "json-reviver":{ "class": "AnimalClass", version: jsonReviver.version },
                _name: 'bob',
                _age: 4,
                _lives: true
            });
            expect(JSON.stringify(j1)).to.eql(j2);
            j1._lives=false;
            var r=jsonReviver.revive(j1);
            console.log('....',r.constructor);
            expect(r).to.be.an(AnimalClass);
            expect(r._name).to.be("bob");
            expect(r._age).to.be(4);
            expect(r._lives).to.be(false);
        });
        it("revive doesn't touch not register objects", function(){
            var p={name: 'squash'};
            expect(jsonReviver.revive(p)).to.be(p);
        });
        it('clones ok', function(){
            var a=new AnimalClass('boby',5);
            var jText=JSON.stringify(a);
            var c=JSON.parse(jText, jsonReviver.reviver);
            expect(c.resume()).to.be("I'm a AnimalClass my name is boby. I'm 5 years all.  I feel good");
        });
        it('clones directly', function(){
            var a=new AnimalClass('boby',5);
            var jText=JSON.stringify(a);
            var b=JSON.parse(jText);
            expect(b.resume).to.not.be.ok();
            jsonReviver.force(JSON);
            var c=JSON.parse(jText);
            expect(c.resume()).to.be("I'm a AnimalClass my name is boby. I'm 5 years all.  I feel good");
        });
    });
});
