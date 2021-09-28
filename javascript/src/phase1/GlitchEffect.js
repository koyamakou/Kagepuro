import  * as VirtualityDOM from '../React_DOM/phase2.js';

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


//loadDisp_img();

export function loadDisp_img() {
  img_backgeround.src = './img/phase1/background_op1.jpg';
  img_backgeround.addEventListener('load', function() {
    img_leter.src = './img/phase1/letter_op1.png';
  });
  img_leter.addEventListener('load', function() {
    init();
  });
  //レスポンシブ時に発火
  window.onresize = onreSizeImg;
};

function onreSizeImg() {
  canvas.width = windowWidth = window.innerWidth;
  canvas.height = windowHeight = window.innerHeight;
  imgLeterWidth = img_leter.width;
  imgLeterHeight = img_leter.height;
  responsive = true;
  // 背景用の画像をcanvas内に収める
  resizeBackgeroundImg();
  // 背景用画像の描写
  dispBackgeroundImg();
  // 文字画像を隠すX軸の取得
  getXCoordinateImg();
  // X座標の一番最初のスタート位置取得
  initialX = (windowWidth - imgLeterWidth)/2;
  if (img_leterCompleteOpenAnimetionFlag) {
    dispLeterImg();
  };
}


function init () {
	//clearInterval(glitchInterval);
	canvas.width = windowWidth = window.innerWidth;
	canvas.height = windowHeight = window.innerHeight;
  imgLeterWidth = img_leter.width;
  imgLeterHeight = img_leter.height;
  resizeBackgeroundImg();
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
 * [resizeBackgeroundImg description]
 * 背景用の画像をcanvas(fillStyle)に収まるようにリサイズする
 * @return {[type]} [description]
 */
function resizeBackgeroundImg() {
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
  // canvasの背景に描写
  tmpContext.fillRect(0, 0, tmpCanvas.width * 2, tmpCanvas.height * 2);
}

/**
 * [resize description]
 * 文字用の画像をcanvas(drawImage)に収まるようにリサイズする
 * 基本 glitch時のレスポンシブに対応する。
 * @return {[type]} [description]
 */
function resizeLeterImg() {
  getXCoordinateImg();
  // 初回書き込み
  const tmpImgCanvas = document.createElement('canvas');
  const tmpImgContext = tmpImgCanvas.getContext('2d');

  tmpImgCanvas.width = windowWidth;
  //tmpImgCanvas.width = img_leter.width;
  tmpImgCanvas.height = img_leter.height;
  tmpImgContext.fillStyle = "#f2f3e1";
  // canvasに収まるようにresize
  tmpImgContext.fillRect(0, 0, tmpImgCanvas.width, tmpImgCanvas.height);
  tmpImgContext.drawImage(img_leter, 0, 0, imgLeterWidth, imgLeterHeight);
  return tmpImgCanvas;
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
  const anime_ImgLeterHide = anime.timeline({
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
         // 表示領域のスピードを決めることができる。(後ろの掛け算のほうで)
         rectX += imgLeterWidth/9000 * 40.5;
         //rectX += imgLeterWidth/9000 * 50;
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
  let count = 0;

  anime_ImgLeterGlitchTL
  .add({
    duration: 6000,
    easing: 'easeInQuart',
    update: function(){
      let cleanTiming = 13;
      let leterImg = resizeLeterImg();
      count++;

      if ( count % 12 === 0) {
        for (let i = 0; i < randomInt(1, 11); i++){
          // 描写する画像のX座標
          let sx = randomInt(windowWidth, (-windowWidth));

          let sh = imgLeterHeight/randomInt(2, 7);
          let dh = sh;
          // x軸の開始位置からx軸の終わり位置まで
          let dx = randomInt((windowWidth - imgLeterWidth)/2 + imgLeterWidth/2, (windowWidth - imgLeterWidth)/2 - imgLeterWidth/2);
          // y軸の開始位置からy軸の終わり位置まで
          let dy = randomInt((windowHeight - imgLeterHeight)/2 + imgLeterHeight/2, (windowHeight - imgLeterHeight)/2 - imgLeterHeight/3);
          // offset
          let offset = randomInt(imgLeterHeight, 0);
          // shとdhは同時に同じ小さい値を指定することで細切れをすることができる。
          context.drawImage(leterImg, 0, offset, leterImg.width, sh, dx, (windowHeight - imgLeterHeight)/2 + offset, leterImg.width, dh);
          context.drawImage(leterImg, sx, offset, leterImg.width, sh, dx, (windowHeight - imgLeterHeight)/2 + offset, leterImg.width, dh);
        }
      } else if(count % cleanTiming === 9 || count % cleanTiming === 10 || count % cleanTiming === 11) {
        cleanTiming = randomInt(8, 16);
        clear();
        dispLeterImg();
      }
    },
    complete: function() {
      img_leterCompleteOpenAnimetionFlag = false;
      //anime_ImgLeterHide.play();
      clear();
      dispLeterImg();
    }
  }, '+=1000');

  /*anime_ImgLeterHide
  .add({
    duration: 750,
    complete: function(){
      clear();
      img_leterCompleteOpenAnimetionFlag = false;
    }
  });*/
  anime_ImgLeterOpenTL.play();
  anime_ImgLeterGlitchTL.finished.then(function() {
    // phase1→phase2にpage遷移。発火用
    VirtualityDOM.reactDOM();
    //let taegetId = document.getElementById('phase1');
    //taegetId.setAttribute('data-phase1', 'execute');
    /*taegetId.addEventListener('animationend', function() {
      VirtualityDOM.reactDOM();
    });*/
  });
};


/**
 * [randomInt description]
 *
 * @param  {[type]} max [最大値]
 * @param  {[type]} min [最小値]
 * @return {[type]}     [description]
 */
function randomInt(max, min) {
  return Math.random() * (max - min) + min;
}

function clear() {
	context.rect(0, 0, windowWidth, windowHeight);
	context.fill();
};
