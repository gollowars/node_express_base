var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

app.set('view engine','jade');
app.set('views',__dirname+'/views');
app.use(bodyParser.urlencoded({extend:true}));
app.use(serveStatic('public'));


var memos = [];
var id = 1;

app.get('/',function(req,res){
  res.render('index',{memos:memos});
});

app.get('/memo/:id',function(req,res){
  //URLから取得したidを元に表示するメモを検索
  var memo = memos.filter(function(memo){
    return parseInt(req.params.id) === memo.id;
  })[0];
  // メモがあったら詳細ページを表示、なければ404を返す
  if(memo) {
    //show.jadeにmemoデータを渡す。
    res.render('show',{memo:memo});
  } else {
    res.status(404);
    res.send('Not Found');
  }
});

app.post('/memo', function(req,res){
  //req.bodyにパースされたボディが格納されている
  memos.push({
    id: id++,
    title: req.body.title,
    body: req.body.body
  });

  // 成功したらトップにリダイレクト
  res.redirect('/');
})

app.listen(3000);