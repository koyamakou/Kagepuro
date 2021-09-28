import React from "react"
import ReactDom from "react-dom"
import  * as phase3 from "../phase3/phase3.js"

// 先に画像を読み込ませておくことで仮想DOM生成後スムーズに画像を表示する。
const imgPath = './img/phase2/letter_next.png';
const img = new Image();
img.src = imgPath;

function Layout(props) {
  return (
    <div class = "phase3">
      <div class = "phase3Background">
        <canvas class = "phase3Background_item" id = "home"></canvas>
        <div>
          <ul class = "leter" id = "leter">
            <li><a href = "https://twitter.com/mekakushidan" target="_blank">Twitter</a></li>
            <li><a href = "http://mekakushidan.com/" target="_blank">OfficialSite</a></li>
            <li><a href = "https://www.youtube.com/watch?v=WEVgkh_7_0k" target="_blank">MUSIC</a></li>
          </ul>
        </div>
      </div>
      <div class = "phase3Animation" id ="collapse"></div>
      <div class = "phase3_Shrink" id = "shrink"></div>
    </div>
  );
}

export function reactDOM(){
  const app = document.getElementById('root');
  ReactDom.render(
    <Layout />,
    app
  );
  phase3.init();
  phase3.initCanvas();
}
