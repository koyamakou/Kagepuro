/****************************************************************************/
/***************************崩壊アニメーション*********************************/
/****************************************************************************/


let rootCanvas;
/**
 * canvasDOMの生成。
 * 反映まで行う。
 * @return {[type]} [description]
 */
function cleateDom() {
  const fragment = document.createDocumentFragment();
  const numberOfElements = 20*20;

  for (let i = 0; i < numberOfElements; i++ ) {
    let canvas = document.createElement('canvas');
    canvas.style.width = (100/20) + '%';
    canvas.style.height = (100/20)  + '%';
    // 謎の空白問題を解決するために使用
    canvas.style.verticalAlign = 'bottom';
    fragment.appendChild(canvas);
  };
  rootCanvas.appendChild(fragment);
}


/**
 * canvasに色を塗る
 * @return {[type]} [description]
 */
function canvasFill() {
  for (let i = 0; i < rootCanvas.childElementCount; i++) {
    let canvas = rootCanvas.childNodes[i];
    let context = canvas.getContext('2d');
    context.fillStyle = '#F6F7F8';
    //context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function animationStart() {
  const cssTarget = document.getElementById('shrink')
  cssTarget.addEventListener('animationend', function(){
    //let element = document.getElementById('phase2');
    cssTarget.style.display = 'none';
    cssTarget.style.zIndex = '-1';
    collapseAnimetion();
  });
}


/**
 * 崩壊アニメーション
 * @return {[type]} [description]
 */
function collapseAnimetion () {
  const animetion_Crum = anime.timeline({
    targets: '#collapse canvas',
    easing: 'easeInOutSine',
    delay: anime.stagger(50),
    loop: false,
    autoplay: false
  })
  .add({
    translateY: 1000,
    easing: 'easeInOutCirc',
    delay: anime.stagger(100, {grid: [20, 20], from: 'center'})
  }, '+=1900');

  animetion_Crum.play();
  animetion_Crum.finished.then(function() {
    let target = document.getElementById('leter');
    target.style.zIndex = "9999";
  });
};

export function init() {
  rootCanvas = document.querySelector('#collapse');
  cleateDom();
  canvasFill()
  animationStart();
}

/****************************************************************************/
/***************************画像表示******************************************/
/****************************************************************************/

/*
const canvas = document.getElementById('home');
const context = canvas.getContext('2d');
let img_Home = new Image();

//  画面の大きさ
let windowWidth;
let windowHeight;
canvas.width = windowWidth = window.innerWidth;
canvas.height = windowHeight = window.innerHeight;

img_Home.src = './img/phase3/home.jpg';

 */





 let canvas;
 let context;
 let img_Home = new Image();

 //  画面の大きさ
 let windowWidth;
 let windowHeight;

 img_Home.src = './img/phase3/home.jpg';


/**
 * canvasの準備
 * @return {[type]} [description]
 */
export function initCanvas() {
  canvas = document.getElementById('home');
  context = canvas.getContext('2d');

  canvas.width = windowWidth = window.innerWidth;
  canvas.height = windowHeight = window.innerHeight;
  img_Home.src = './img/phase3/home.jpg';
  img_Home.addEventListener('load', function() {
    canvasImgFill();
  });
  window.onresize = reSizeOnresize;
}


/**
 * canvasに画像を貼り付ける
 * @return {[type]} [description]
 */
function canvasImgFill() {
  let imgWidth = img_Home.width;
  let imgHeight = img_Home.height;
  // レスポンシブ
  let imgCanvasSize = responsiveImg(imgWidth, imgHeight);
  // 画像を表記
  context.fillStyle = "#000000";
  context.fillRect(0, 0, windowWidth, windowHeight);
  context.drawImage(img_Home, 0, (windowHeight - imgCanvasSize.height)/2, imgCanvasSize.width, imgCanvasSize.height);
}

/**
 * レスポンシブを行う。
 * @param  {[type]} imgWidth  [description]
 * @param  {[type]} imgHeight [description]
 * @return {[type]}           [description]
 */
function responsiveImg(imgWidth, imgHeight) {
  let imgCanvasSize = {width: imgWidth, height: imgHeight};
  // 画像の縦と横の比率を取得
  let ratio = imgHeight / imgWidth;
  if ( windowWidth < imgWidth ) {
    // スマホ用
    imgCanvasSize.width = windowWidth;
    imgCanvasSize.height = imgCanvasSize.width * ratio;
  } else {
    // 画像を拡大する(PC用)
    let expansion = windowWidth - imgCanvasSize.width;
    let expansionRatio = expansion/imgCanvasSize.width;
    imgCanvasSize.width = imgWidth + expansion;
    imgCanvasSize.height = imgHeight + (imgHeight * expansionRatio);
  }
  return imgCanvasSize;
}

/**
 * 画面のリサイズ時に使用する関数
 * window.onresize =　reSizeOnresize();
 * の方法で使う
 * @return {[type]} [description]
 */
function reSizeOnresize(){
    canvas.width = windowWidth = window.innerWidth;
    canvas.height = windowHeight = window.innerHeight;
    canvasImgFill();
}
