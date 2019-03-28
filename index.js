const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('resource'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
  res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/api/getSwipeImages', function (req, res) {
  const imgPath = 'http://127.0.0.1:8081/images/swipe/';
  const img = [];
  for (let i = 0; i < 4; i++) {
    img.push(imgPath + (i + 1) + '.jpg');
  }
  res.send(img);
});

app.get('/api/getNewsList', function (req, res) {
  const imgPath = 'http://127.0.0.1:8081/images/news/mycar.jpg';
  const newsList = new Array(10).fill({
    image: imgPath,
    title: '奔驰又出新车，一起去参观！',
    subTitle: '汽车一点通'
  });
  res.send(newsList);
});

app.get('/api/getCarPhotos', function(req, res) {
  const carJsonFile = path.resolve(__dirname, 'resource/json/carPhoto.json');
  fs.readFile(carJsonFile, 'utf-8', function (err, data) {
    if (err) {
      res.send([]);
    } else {
      res.send(data);
    }
  })
})

const server = app.listen(8081, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
