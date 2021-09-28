import React from "react"
import ReactDom from "react-dom"
import  * as phase2 from "../phase2/phase2.js"

function Layout(props) {
  return (
    <div class = "phase2">
      <div class = "phase2_background"  id = "phase2">
        <div class = "background_inner"></div>
        <div class = "background_cover"></div>
        <div id ="waitTime"></div>
      </div>
    </div>
  );
}

export function reactDOM(){
  const app = document.getElementById('root');
  ReactDom.render(
    <Layout />,
    app
  );
  phase2.switch_phase2();
}
