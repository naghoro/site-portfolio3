import Head from 'next/head'
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router'

import * as THREE from 'three';
import { SingletonRenderer } from "../../js/SingletonRenderer.js";

import comstyles from '../../styles/com.module.css'

// デフォルト値
let worldX = 640
let worldY = 420

const scene = new THREE.Scene();

const light1 = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(light1);

var light2 = new THREE.DirectionalLight(0xFFFFFF);
light2.position.set(10, 10, 10);
scene.add(light2);

const raycaster = new THREE.Raycaster();

export default function Home() {
  const router = useRouter()  

  // instance
  const CanvasRef = useRef(null)

  // クリック、タッチ用
  const [clickON, setClickOn] = useState(null)

  const ClickONEventAll = function(e) {
    setClickOn(true)
  }

  const ClickOFFEventAll = function(e) {
    setClickOn(false)
  }

  // 動かすイベント
  const [mousePos, setMousePos] = useState(null) 
  const [mousePlus, setMousePlus] = useState(0) 

  // PC 操作用
  const MouseMove = function(e) {
    if(! clickON) {
      return
    }

    if(mousePos) {
      let positive = e.clientX - mousePos;

      // 離れた点をクリックした時
      if(Math.abs(positive) <= 20){
        setMousePlus(positive)
      }
    }

    setMousePos(e.clientX)
  }

  // スマートフォン用
  const TouchMove = function(e) {
    if(! clickON) {
      return
    }

    const sX = e.touches[0].pageX;

    if(mousePos) {
      let positive = sX - mousePos;

      if(Math.abs(positive) <= 20){
        setMousePlus(positive)
      }
    }

    setMousePos(sX)
  }

  // Canvasの位置
  const [clickPos, setClickPos] = useState(null)

  const CanvasClick = function(e) {
    setClickPos({
      x: e.clientX - CanvasRef.current.offsetLeft,
      y: e.clientY - CanvasRef.current.offsetTop
    })
  }

  const StartAnimation = function(instance, max) {
    const renderer = instance.renderer;

    // 惑星を回す
    let d = 0
    let animateStep = function () {

        if(d < max) {
           requestAnimationFrame(animateStep)
        }
        d++

        instance.updateModelsPos(1)
        renderer.render(scene, instance.camera);
    }

    animateStep()
  }

  const ShowCanvas = function(instance, first) {
    const renderer = instance.renderer;

    renderer.render( scene, instance.camera );

    if (first) {
      StartAnimation(instance, 360)
    }
  }


  const UpdateCanvas = function(instance) {

    if (mousePlus > 0) {
      //右に動かす
      const renderer = instance.renderer;

      instance.updateModelsPos(mousePlus * -1)
      renderer.render(scene, instance.camera);

      setMousePlus(0)
      setMousePos(null)
    } else if (mousePlus < 0) {
      // 左
      const renderer = instance.renderer;

      instance.updateModelsPos(mousePlus * -1)
      renderer.render(scene, instance.camera);

      setMousePlus(0)
      setMousePos(null)
    }

    // クリックまたはタッチで遷移
    if (clickPos != null) {
      let targetlist = []

      Object.keys(instance.models).forEach((key) => {
        const model = instance.models[key]["model"]
        if(model != null) {
          model.children.forEach(function(child){
            targetlist.push(child)
          })
        }
      })

      const x = clickPos.x;
      const y = clickPos.y;
      const w = worldX; 
      const h = worldY;

      // -1〜+1の範囲で現在のマウス座標を登録する
      const mouse = new THREE.Vector2();
      mouse.x = ( x / w ) * 2 - 1;
      mouse.y = -( y / h ) * 2 + 1;

      // 光線とぶつかったオブジェクトを得る
      raycaster.setFromCamera(mouse, instance.camera);
      const intersects = raycaster.intersectObjects(targetlist);
  
      if(intersects.length > 0){
        let targetName = ""

        for ( let i = 0; i < intersects.length; i ++ ) {
          if(intersects[i]["object"]["name"].startsWith("VR")) {
            targetName = "vr"
            break
          }
          else if(intersects[i]["object"]["name"].startsWith("AR")) {
            targetName = "ar"
            break
          }
          else if(intersects[i]["object"]["name"].startsWith("WEB")) {
            targetName = "web"
            break
          }
        }

        if (targetName.length > 0) {
          router.push("/xr-portfolio/" + targetName)
        }
      }

      setClickPos(null)
    }
  }

  useEffect(() => {
    if (window.innerWidth <= worldX) {
      worldX = window.innerWidth
    }

    const camera = new THREE.PerspectiveCamera( 75, worldX / worldY, 0.1, 1000 );
    camera.position.z = 10;

    const [instance, first] = SingletonRenderer.getInstance(scene, camera, CanvasRef.current, worldX, worldY)

    ShowCanvas(instance, first)
    UpdateCanvas(instance)
  })

  return (
    <div className="container" onMouseDown={ClickONEventAll} onMouseMove={MouseMove} onMouseUp={ClickOFFEventAll} 
        onTouchStart={ClickONEventAll} onTouchEnd={ClickOFFEventAll} onTouchMove={TouchMove}>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>なほろのポートフォリオ</title>
      </Head>

      <main className={comstyles.main}>
        <h1 className={comstyles.title}>
          なほろのポートフォリオの世界
        </h1>

        <canvas ref={CanvasRef} onClick={CanvasClick}></canvas>
      </main>

      <footer className={comstyles.footer}>
        © 2021 naghoro.jp
      </footer>

    </div>
  )
}
