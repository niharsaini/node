//creating a web server without help of any
// 3rd party module for serving html files,
// images,css files,js files.

const http = require('http');

const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes ={

    "html":"text/html",
    "jpeg":"image/jpeg",
    "jpg":"image/jpg",
    "png":"image/png",
    "js":"text/javascripy",
    "css":"text/css"
};

http.createServer(function(req,res){
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
console.log('Loading' + uri);


var stats;
try {

    stats = fs.lstatSync(fileName);
}

catch(e){
   res.writeHead(404,{'Content-type':'text/plain'});
  res.write('404 not found\n');
  res.end();
  return;

}
//checking whether it's a file or a directory
if(stats.isFile()) {
    var mimeType = mimeTypes[path.extname(fileName).split(".").reverse[0]];
    res.writeHead(200, {'Content-type': mimeType});
    var fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
}
else if(stats.isDirectory()) {
    res.writeHead(302, {
        'Location': 'index.html'
    });
    res.end();

}else{
    res.writeHead(500,{'Content-type':'text/plain'});
    res.write('500 internal error\n');
    res.end();
}

}).listen(1333);
