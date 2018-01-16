var superagent = require('superagent') //一个类似Ajax为了访问网页返回数据的包
var cheerio = require('cheerio'); //一个类似JQ主要为了读取HTMLE页面的包


var request = require('request'); //一个类似JQ主要为了读取HTMLE页面的包

var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统
var http = require("http"); //node原生http系统



/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri,filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback); 
}

var fileUrl  = 'http://dl.feiku.com/a1/25/5c/15544.txt';
var filename = 'book/15544.txt';
downloadFile(fileUrl,filename,function(){
    console.log(filename+'下载完毕');
});



// function getUrls() {
// 	var urls = [],
// 		baseUrl = 'http://www.mmjpg.com/mm/';
// 		var dir = './BOOK/book.json';
// 		//创建目录 
// 		mkdirp(dir, function(err) {
// 			if(err) {
// 				console.log(err);
// 			} else console.log(dir + '文件夹创建成功!');
// 		});
// }


var dir = './BOOK/book.json';

//  superagent.get("http://home.feiku.com/shuku/")
// 	.end(function (err, res) {
// 		var $ = cheerio.load(res.text)
// 		var texts = $(".all-img-list");
// 		var book = [];
// 		var books = Array();
// 		// josn 电子书列表 内容
// 		for (var i = 0; i < texts.find("li").length; i++) {
// 			var arr = '{' +
// 				'"href" : "' + texts.find("li").eq(i).find(".book-img-box a").attr("href") + '",' +
// 				'"imgsrc" : "' + texts.find("li").eq(i).find(".book-img-box img").attr("src") + '",' +
// 				'"bookname" : "' + texts.find("li").eq(i).find(".book-mid-info h4 a").text() + '",' +
// 				'"author" : "' + texts.find("li").eq(i).find(".book-mid-info  .name").text() + '"' +
// 				'}'
// 			book.push(arr);
// 		}
// 		// josn 电子书列表 
// 		books = '{"booklist": [' +book +']}'
// 		fs.appendFile(dir, books, function (err) {
// 			if (err) {
// 				console.log(err);
// 			}
// 			console.log("添加成功！");
// 		});
// 	})







