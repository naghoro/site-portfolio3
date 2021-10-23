import Head from 'next/head'

import comstyles from '../../styles/com.module.css'
import detailstyles from '../../styles/detail.module.css'

import Link from 'next/link'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <meta charSet="utf-8"></meta>
        <title>ポートフォリオ ARについて</title>
      </Head>

      <main className={comstyles.main} className={detailstyles.main}>
        <Link href="/xr-portfolio">
          <a className={detailstyles.backlink}>
            戻る
          </a>
        </Link>

        <section className={detailstyles.detail}>
          <div className={detailstyles.inner}>
            <h1 className={detailstyles.title}>
              ARについて
            </h1>

            <nav className={detailstyles.nav}>
              <a href="#shader">ARにシェーダーを挟む</a>
              <a href="#ml">ARに機械学習を挟む</a>
            </nav>

            <h2 id="shader">ARにシェーダーを挟む</h2>
            カメラの映像にシェーダーを挟めるか試しました。<br />
            <div className={detailstyles.movie}>
              <video src="/xr-portfolio/movie/20210321_154636_Trim.mp4"  controls></video>
            </div>
            <br/>
            Packages / com.unity.xr.arcore / Assets / Shaders / ARCoreBackground.shaderを微修正したものを、AR Camera Backgroundの Custom Materialに割り当てました。

            <h2 id="ml">ARに機械学習を挟む</h2>
            カメラの映像に機械学習を挟めるか試しました。<br />

            <br/>
            ▽途中少し止まりますが、推論しています。
            <div className={detailstyles.movie}>
              <video src="/xr-portfolio/movie/20210829_174414_Trim.mp4" poster="/xr-portfolio/image/arposter2.png" controls></video>
            </div>
            <br/>
            機械学習は、PytorchのYOLOv5を使用しました。
            Android StudioでPytorchのExampleを元にライブラリを作成してUnityに持っていきました。<br />
            結果はuGUIを使って描画しています。<br />
            <br/>
            ※推論させるまでbyteデータを、Texture2D ⇒ Shaderで縦横変換 ⇒ RenderTexture ⇒ Texture2D ⇒ Jpg ⇒ android Bitmap と変換を行いました。<br />
            なんとか動きましたが、いろいろと厳しいですね。<br />
            もっと変換を少なくするか、そもそもPytorchのライブラリを持っていくよりは、Unity Barracudaを使えるならその方が良いなと思いました。
          </div>

        </section>
      </main>

      <footer className={comstyles.footer}>
        © 2021 naghoro.jp
      </footer>

    </div>
  )
}
