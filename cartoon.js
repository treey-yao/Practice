var superagent = require('superagent') //一个类似Ajax为了访问网页返回数据的包
var cheerio = require('cheerio'); //一个类似JQ主要为了读取HTMLE页面的包

var request = require('request'); //一个类似JQ主要为了读取HTMLE页面的包

var fs = require("fs") //node原生文件系统
var path = require('path'); //node原生路径系统
var http = require("http"); //node原生http系统

var async = require('async');


// 需要爬的网址 
function getUrls(call) {
    var urls = [],
        baseUrl = 'http://www.kuman.com/mh-1001261/';
    var tmp = baseUrl + call + "/";
    urls.push(tmp);
    return urls;
}



function each(call) {
    var urls = getUrls(call);
    //  执行程序 异步
    async.eachSeries(urls, function (url, callback) {
    fetchUrl(url, callback);
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            //console.log('下载成功');
        }
    });
}

//call ：章数
each(52)

// ------------------方法------------
// // 抓取网页内容 
function fetchUrl(url, callback) {

    var options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
            'Connection': 'keep-alive'
        }
    };
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        else {
            //console.log('成功打开新世界大门' + options.url);
        }
        if (!error && response.statusCode == 200) {
         acquireData(options.url, body);
          callback(null,null );
        }
    })
}

function acquireData(url, data) {
    var $ = cheerio.load(data);
    var fenYe = $("option");
    var $header = $("#header");
    var link = "";
    let  i = 0 //定时器运行次数计数
    var ztime = new Date() //程序开始时间(为了计算整个程序耗时)

    var filename = "./uploads/" + $header.find("h1").text() + "-" + fenYe.length;

    //如果没有这个文件夹
    if (!fs.existsSync(filename)) {
        fs.mkdir(filename, function (err) {
            if (err) {
                console.log("文件创建失败。");
                return;
            }
            console.log("文件创建成功。");
        })
    }


    //定时器准备遍历这个本子把每页都保存下来
    timer = setInterval(function () {

        if (i < fenYe.length) { //如果page小于i就说明没比例完

            i++ //i++继续遍历

        } else { //否则遍历完了

            i = fenYe.length //i=page
            var xtime = new Date() - ztime // ztime是程序开始执行的时间   得出 一共用了多少秒
            clearInterval(timer); //结束了 关闭定时器
            console.log("********一共花费了" + xtime + "毫秒********");

        }

        if (i === 0) {
            link = url;
        } else {
            var urllink = url.split("/");
            link = "http://www.kuman.com/mh-1001261/" + urllink[4] + "-" + i + "/";
        }


        superagent.get(link)
            .end(function (err, res) {
                var $y = cheerio.load(res.text);
                //图片
                var scripts = $y("html").find("script");

                scripts.each(function () {
                    var texts = $(this).html();
                    if (texts.match('show')) {

                        var substr = texts.match(/http(\S*)km2/);
                        if (substr != null) {

                            var filedir = filename + "/" + i + ".jpg"

                            if (!fs.existsSync(filedir)) {
                                /*
                                * fileUrl 网络文件地址
                                * filedir 文件名
                                * callback 回调函数
                                */
                                downloadFile(substr[0], filedir, function () {
                                    console.log('下载完毕');
                                });
                            }

                        }
                    }
                })

            });


    }, 800) //2000毫秒爬一张图片



}


/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri, filename, callback) {
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}






