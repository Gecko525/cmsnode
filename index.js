const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.static('resource'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

app.get('/api/getNewsDetail', function (req, res) {
  const newsDetail = path.resolve(__dirname, 'resource/json/news.json');
  fs.readFile(newsDetail, 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data).data[0]);
    }
  })
});

app.post('/api/comment', function (req, res) {
  const file = path.resolve(__dirname, 'resource/json/news.json');
  const review = req.body;
  fs.readFile(file, 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      const news = JSON.parse(data);
      news.data[0].review.unshift(review);
      fs.writeFile(file, JSON.stringify(news), function (err2) {
        if (err2) {
          console.log(err2)
        } else {
          res.send('ok');
        }
      })
    }
  })
});

app.get('/api/getCarPhotos', function(req, res) {
  const carJsonFile = path.resolve(__dirname, 'resource/json/carPhoto.json');
  const labelId = req.query.id;
  fs.readFile(carJsonFile, 'utf-8', function (err, data) {
    const photos = [];
    if (err) {
      res.send([]);
    } else {
      const allData = JSON.parse(data);
      if (labelId === '0') {
        res.send(allData.data);
      } else {
        res.send(allData.data.filter((p) => {
          if (labelId === '5') {
            return parseInt(p.id) % 5 === 0
          } else {
            return parseInt(p.id) % 5 === parseInt(labelId)
          }
        })
        );
      }
    }
  })
});

const server = app.listen(8081, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
