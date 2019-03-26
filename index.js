const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.static('resource'));
app.get('/api/getSwipeImages', function (req, res) {
  res.append('Access-Control-Allow-Origin', '*');
  const imgPath = 'http://127.0.0.1:8081/images/swipe/';
  const img = [];
  for (let i = 0; i < 4; i++) {
    img.push(imgPath + (i + 1) + '.jpg');
  }
  res.send(img);
});

app.get('/api/getNewsList', function (req, res) {
  res.append('Access-Control-Allow-Origin', '*');
  const imgPath = 'http://127.0.0.1:8081/images/news/mycar.jpg';
  const newsList = new Array(10).fill({
    image: imgPath,
    title: '奔驰又出新车，一起去参观！',
    subTitle: '汽车一点通'
  });
  res.send(newsList);
});

const server = app.listen(8081, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
