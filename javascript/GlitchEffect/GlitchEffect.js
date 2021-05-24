const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// 背景画像をリサイズする一時変数
const tmpCanvas = document.createElement('canvas');
const tmpContext = tmpCanvas.getContext('2d');

// imgオブジェクト
let img_leter = new Image();
let img_backgeround = new Image();

//  画面の大きさ
let windowWidth;
let windowHeight;
// 文字画像の大きさ
let imgLeterWidth;
let imgLeterHeight;

// 文字画像が全てブラウザに表示してか判断するflag
let img_leterCompleteOpenAnimetionFlag = false;
// レスポンシブ発生時のlag
let responsive = false;
// 表示アニメーションの初期値X
let initialX;

let glitchInterval;





loadDisp_img();
function loadDisp_img() {
  img_backgeround.src = './img/background_op1.jpg';
  img_backgeround.addEventListener('load', function() {
    img_leter.src = './img/letter_op1.png';
  });
  img_leter.addEventListener('load', function() {
    init();
  });
  window.onresize = onreSizeImg;
};

function onreSizeImg() {
  canvas.width = windowWidth = window.innerWidth;
  canvas.height = windowHeight = window.innerHeight;
  imgLeterWidth = img_leter.width;
  imgLeterHeight = img_leter.height;
  responsive = true;
  // 背景用の画像をcanvas内に収める
  resize();
  // 背景用画像の描写
  dispBackgeroundImg();
  // 文字画像を隠すX軸の取得
  getXCoordinateImg();
  // X座標の一番最初のスタート位置取得
  initialX = (windowWidth - imgLeterWidth)/2;
  if (img_leterCompleteOpenAnimetionFlag) {
    dispLeterImg();
  };
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
}


function init () {
	//clearInterval(glitchInterval);
	canvas.width = windowWidth = window.innerWidth;
	canvas.height = windowHeight = window.innerHeight;
  imgLeterWidth = img_leter.width;
  imgLeterHeight = img_leter.height;
  resize();
  dispBackgeroundImg();
  getXCoordinateImg();
  glitchImg();
};
/**
 * 文字の画像を表示
 * [dispLeterImg description]
 * @return {[type]} [description]
 */
function dispLeterImg() {
  // 文字画像の横と縦の比率
  getXCoordinateImg();
  context.drawImage(img_leter, (windowWidth - imgLeterWidth)/2, (windowHeight - imgLeterHeight)/2, imgLeterWidth, imgLeterHeight);
}

/**
 * 削除開始用のX座標を取得
 * [getXAxisImg description]
 * @return {Boolean} [description]
 */
function getXCoordinateImg() {
  let ratio;
  if ( windowWidth - imgLeterWidth < 85 ) {
    ratio = imgLeterHeight / imgLeterWidth;
    // 左右のmargeの代わりに100引いている
    imgLeterWidth = windowWidth - 100;
    imgLeterHeight = imgLeterWidth * ratio;
  }
}


/**
 * 背景用の画像を表示
 * [dispBackgeroundImg description]
 * @return {[type]} [description]
 */
function dispBackgeroundImg() {
  let pattern = context.createPattern(tmpCanvas, 'no-repeat');
  context.fillStyle = pattern;
  // 画像の表示
	context.fillRect(0, 0, img_backgeround.width, img_backgeround.height);
	context.fill();
};

/**
 * [resize description]
 * 背景用の画像をcanvas(fillStyle)に収まるようにリサイズする
 * @return {[type]} [description]
 */
function resize() {
  // 初回書き込み
  tmpCanvas.width = img_backgeround.naturalWidth;
  tmpCanvas.height = img_backgeround.naturalHeight;
  tmpContext.drawImage(img_backgeround, 0, 0);
  const pattern = tmpContext.createPattern(tmpCanvas, 'no-repeat');

  // リサイズ結果を転写する
  const scaleWidth = windowWidth/tmpCanvas.width;
  const scaleHeight = windowHeight/tmpCanvas.height;
  //  scale()でも問題ない
  tmpContext.setTransform(scaleWidth, 0, 0, scaleHeight, 0, 0);
  tmpContext.fillStyle = pattern;
  tmpContext.fillRect(0, 0, tmpCanvas.width * 2, tmpCanvas.height * 2);
}

function glitchImg() {
  // anime
  initialX = (windowWidth - imgLeterWidth)/2;
  let rectX = initialX;
  let proportion =  (rectX - initialX)/imgLeterWidth;
  let processingX;

  // 文字表示
  const anime_ImgLeterOpenTL = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: false,
    loop: false,
  });
  // 文字のGlitchEffect
  const anime_ImgLeterGlitchTL = anime.timeline({
    easing: 'easeInOutSine',
    autoplay: false,
    loop: false,
  });
/****************************************************************/
/**********************文字表示Animetion*************************/
/***************************************************************/
  anime_ImgLeterOpenTL.add({
     duration: 9000,
     update: function(anime){
       if ( !responsive) {
         // レスポンシブしていない
         rectX += imgLeterWidth/9000 * 21.5;
         // 全体の何割進んだか比率を求める
         proportion = (rectX - initialX)/imgLeterWidth;
         // どれくらい進むか
         processingX = proportion * imgLeterWidth + initialX;
       } else {
         // レスポンシブしている
         responsive = false;
         // レスポンシブする前の比率からどこまで進んだか取得。レスポンシブに対応
         rectX = processingX = proportion * imgLeterWidth + initialX;
       }

       clear();
       dispBackgeroundImg();
       dispLeterImg();
       // パス
       context.fillRect(processingX, (windowHeight - imgLeterHeight)/2, imgLeterWidth, imgLeterHeight);

       if (processingX > ((windowWidth - imgLeterWidth)/2 + imgLeterWidth)) {
         // 時間以内に文字が表示した場合、次のアニメーションに渡す。
         img_leterCompleteOpenAnimetionFlag = true;
         anime_ImgLeterOpenTL.pause();
         anime_ImgLeterGlitchTL.play();
       }
     },
     complete: function(anime) {
       img_leterCompleteOpenAnimetion = true;
       anime_ImgLeterGlitchTL.play();
     }
  });

  /****************************************************************/
  /**********************文字のGlitchEffect************************/
  /***************************************************************/
  anime_ImgLeterGlitchTL
  .add({
    update: function(){
      let glitch1 = {
        sx: imgLeterWidth*0.5, sy: imgLeterHeight
      }

      let sy = imgLeterHeight;

      console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiii：' + imgLeterWidth);
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa：' + imgLeterHeight);
      context.drawImage(img_leter, 0, 0, imgLeterWidth, imgLeterHeight, (windowWidth - imgLeterWidth)/2, (windowHeight - imgLeterHeight)/2, imgLeterWidth, imgLeterHeight);
      //context.drawImage(img_leter, imgLeterWidth*50, 10, imgLeterWidth, imgLeterHeight, (windowWidth - imgLeterWidth)/2, (windowHeight - imgLeterHeight)/2, imgLeterWidth, imgLeterHeight);
    }
  }, '+= 500')
  .add({
    update: function(){
      //context.drawImage(img_leter, 100, 50, imgLeterWidth, imgLeterHeight-80, (windowWidth - imgLeterWidth)/2, (windowHeight - imgLeterHeight)/2, imgLeterWidth, imgLeterHeight);
    }
  })
  .add({
    update: function(){
      clear();
      dispLeterImg();
    }
  });
  anime_ImgLeterOpenTL.play();
};


/*
function glitchImg() {
	//for (var i = 0; i < randInt(1, 13); i++) {
		var x = Math.random() * w;
		var y = Math.random() * h;
		var x = Math.random() * 5000;
		var y = Math.random() * 5000;
		var spliceWidth = w - x;
		var spliceHeight = randInt(5, h / 3);
    context.drawImage(img_leter, 100, 50, img_leter.naturalWidth-100, img_leter.naturalHeight-80, (w - img_leter.naturalWidth)/2, (h - img_leter.naturalHeight)/2, img_leter.naturalWidth, img_leter.naturalHeight);
    //context.drawImage(img_leter, 0, 0, img_leter.naturalWidth-100, img_leter.naturalHeight-80, (w - img_leter.naturalWidth)/2, (h - img_leter.naturalHeight)/2, img_leter.naturalWidth, img_leter.naturalHeight);
	//}
};*/

function clear() {
	context.rect(0, 0, windowWidth, windowHeight);
	context.fill();
};
