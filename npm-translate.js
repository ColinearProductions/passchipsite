"use strict";
var TJO = require('translate-json-object')();
var fs = require('fs');







// first two arguments are used by node
var args = process.argv.slice(2);

var inputFilePath = args[0];
var outputFilePath = args[1];
var language = args[2];


translate(inputFilePath,outputFilePath,language);

function translate(file_path, output_file, language) {
    var file = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    TJO.init({yandexApiKey: 'trnsl.1.1.20160809T121602Z.95dd03be47bf7006.ba039aa0f2bd0acf3224a0b7f1f70c76384a9bf1'});
    TJO.translate(file, language).then(function (data) {
        save_file(file_path, output_file,data);

    }).catch(function (err) {
        console.log('error ', err)
    });
}


function save_file(input, file_path, translated_json){
    console.log(translated_json);
    fs.writeFile(file_path, JSON.stringify(translated_json), 'utf8');
}










function wait(seconds) {
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while (waitTill > new Date()) {
    }

}

	
