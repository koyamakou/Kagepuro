const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// 背景画像をリサイズする一時変数
const tmpCanvas = document.createElement('canvas');
const tmpContext = tmpCanvas.getContext('2d');


let img_leter = new Image();
let img_backgeround = new Image();
let w;
let h;
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
  window.onresize = init;
};

function init () {
	//clearInterval(glitchInterval);
	canvas.width = w = window.innerWidth;
	canvas.height = h = window.innerHeight;
	//glitchInterval = setInterval(function() {
    resize();
    dispBackgeroundImg();
    //context.drawImage(img_leter, (w - img_leter.naturalWidth)/2, (h - img_leter.naturalHeight)/2, img_leter.naturalWidth, img_leter.naturalHeight);
    dispLeterImg();
	//setTimeout(glitchImg(), 1000);
	//}, 500);
};
/**
 * 文字の画像を表示
 * [dispLeterImg description]
 * @return {[type]} [description]
 */
function dispLeterImg() {
  let width = img_leter.width;
  let height = img_leter.height;
  // 文字画像の横と縦の比率
  let ratio;
  if ( w - width < 85 ) {
    ratio = height / width;
    width = w - 100;
    height = width * ratio;
  }
  context.drawImage(img_leter, (w - width)/2, (h - height)/2, width, height);
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
  const scaleWidth = w/tmpCanvas.width;
  const scaleHeight = h/tmpCanvas.height;
  //  scale()でも問題ない
  tmpContext.setTransform(scaleWidth, 0, 0, scaleHeight, 0, 0);
  tmpContext.fillStyle = pattern;
  tmpContext.fillRect(0, 0, tmpCanvas.width * 2, tmpCanvas.height * 2);
}


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
};

function randInt(a, b) {
	return (Math.random() * (b - a) + a);
};

function clear() {
	context.rect(0, 0, w, h);
	context.fill();
};
