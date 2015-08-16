"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
(function webpackUniversalModuleDefinition(root, factory) {
    /* global define */
    /* istanbul ignore next */
    if(typeof root.globalModuleName !== 'string'){
        root.globalModuleName = factory.name;
    }
    /* istanbul ignore next */
    if(typeof exports === 'object' && typeof module === 'object'){
        module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        define(factory);
    }else if(typeof exports === 'object'){
        exports[root.globalModuleName] = factory();
    }else{
        root[root.globalModuleName] = factory();
    }
    root.globalModuleName = null;
})(/*jshint -W040 */this, function jsonReviver() {
/*jshint +W040 */

/*jshint -W004 */
var jsonReviver={};
/*jshint +W004 */

jsonReviver.version="0.0.1";

var revivers={
};

jsonReviver.register = function register(classFunction){
    revivers[classFunction.name] = classFunction;
    classFunction.prototype.toJSON = function(){
        var json = {};
        json["json-reviver"]={
            "class": classFunction.name,
            "version": jsonReviver.version
        }
        for(var attr in this) if(this.hasOwnProperty(attr)){
            var value=this[attr];
            if(!(value instanceof Function)){
                json[attr]=value;
            }
        }
        return json;
    }
}

jsonReviver.revive = function revive(plainObject){
    var reviverInfo;
    if((reviverInfo=plainObject["json-reviver"]) && reviverInfo.class){
        var o=Object.create(revivers[reviverInfo.class].prototype);
        for(var attr in plainObject){
            if(attr!="json-reviver"){
                o[attr]=plainObject[attr];
            }
        }
        return o;
    }else{
        return plainObject;
    }
}

jsonReviver.reviver = function revive(key, plainObject){
    return jsonReviver.revive(plainObject);
}

jsonReviver.force = function revive(jsonGlobalObject){
    var oldParse=jsonGlobalObject.parse;
    jsonGlobalObject.parse = function parse(text){
        return oldParse.call(this, text, jsonReviver.reviver);
    }
}

return jsonReviver;

}); 