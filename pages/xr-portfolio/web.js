import Head from 'next/head'
import comstyles from '../../styles/com.module.css'
import detailstyles from '../../styles/detail.module.css'

import Link from 'next/link'

//            <pre>
//            <code>{`
//              // 分かり易さのために省略しています。
//              
//              export class SingletonRenderer {
//                static getInstance(canvas) {
//                  if (!SingletonRenderer.instance) {
//                    SingletonRenderer.instance = new SingletonRenderer(canvas);
//                  }
//
//                  return SingletonRenderer.instance;
//                }
//
//                constructor(canvas) {
//                  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
//                  this.renderer = renderer
//                }
//              }
//            `}
//            </code>
//            </pre>

export default function Home() {

  return (
    <div className="container">
      <Head>
        <meta charSet="utf-8"></meta>
        <title>ポートフォリオ WEBについて</title>
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
              WEBについて
            </h1>

            <h2>ポートフォリオの作成</h2>
            このサイトをthree.jsを使って作りました。<br />

            three.jsがimportなど、サーバを前提としていたので、react + next.jsの組み合わせが開発し易いかと思い使いました。<br />

            <br/>
            いくつか作るにあたり苦労した点があります。

            ・canvasをどうやって初期化するか<br/>
            最も苦労した点です。結果的に useRef を使い、canvasに渡す。かつ、three.jsのrendererの初期化は Singletonで行うようにしました。
            <br/>

            理由は、Canvas自体にイベントによるアップデートを入れたいが、そうすると毎回初期化が走ってしまうからです。
            <br/>
            <br/>


            ・ブラウザバックで中途半端な状態になる。
            Canvasの描画無くなります。ただし、Reactを使ったSPAとして作っているので Singletonのオブジェクトは残っています。<br/>
            そこで、Canvasが描画されているかどうか、パラメータとして渡して、
            かつ、オブジェクトがあるかどうかで初期化するか、残っている情報を引き継いで実装するか分けました。

            <br/>
            <br/>
            ソースは githubに置きました。

            <br/>
            <br/>
            ※余談ですが、テクスチャは Clip Studioを使って描きましたが、
          </div>

        </section>
      </main>

      <footer className={comstyles.footer}>
        © 2021 naghoro.jp
      </footer>

    </div>
  )
}
