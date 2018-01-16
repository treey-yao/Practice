var fs = require("fs");
var iconv = require('iconv-lite')

var dir = './book/book.json';

fs.readFile("./book/15544.txt", function (err, data) {
    var textcontent = iconv.decode(data, 'gbk').replace(/"/g, "”").replace(/[\r\n]/g, "");

    var book = [];
    var books = Array();

    var catalog = [];

    var textcontent_arr = textcontent.split("###");

    // 内容
    for (i = 0; i < textcontent_arr.length; i++) {
        var arr = '{' +
            '"'+i+'" : "' +textcontent_arr[i]+ '"' +
            '}'
        book.push(arr);
    }

    // 目录

    for (i = 0; i < textcontent_arr.length; i++) {
        var arr = '{' +
            '"'+i+'" : "' +textcontent_arr[i].split(" ")[0]+ '"' +
            '}'
        catalog.push(arr);
    }


    books = '{"booklist": [' +book +'],"catalog":['+catalog +']}'

    fs.appendFile(dir, books, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("添加成功！");
    });
});  
