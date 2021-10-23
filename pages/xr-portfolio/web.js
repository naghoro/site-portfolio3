import Head from 'next/head'
import comstyles from '../../styles/com.module.css'
import detailstyles from '../../styles/detail.module.css'

import Link from 'next/link'

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
            サイトは御覧の通りなので、技術的な苦労点を紹介します。<br/>

            <br/>
            まず前提となりますが、<br />
            three.jsがサーバを前提としていたので、react + next.jsの組み合わせが開発し易いかと思い使いました。<br />
            html内にcanvasタグを記載し、useRefを使ってそのcanvasを参照します。描画後にcanvasを初期化したいため、useEffect内で処理をします。

            <pre className={detailstyles.code}>
            <code>{`// 分かり易さのために省略しています。
export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // ここでcanvasを初期化
  })

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}`}
            </code>
            </pre>

            それでは苦労した点です。<br/>

            <h3>苦労1. canvas (renderer)をどうやって初期化するか</h3>
            最も苦労した点です。three.jsの renderer の初期化は Singleton で行うようにしました。<br/>
            理由は、canvasをイベントによって更新したいが、イベントごとに毎回初期化が走ってしまうからです。
            <br/>
            <pre className={detailstyles.code}>
            <code>{`// 分かり易さのために省略しています。
export class SingletonRenderer {
  static getInstance(canvas) {
    if (!SingletonRenderer.instance) {
      SingletonRenderer.instance = new SingletonRenderer(canvas);
    }

    return SingletonRenderer.instance;
  }

  constructor(canvas) {
    const renderer = new THREE.WebGLRenderer({canvas: canvas})
    this.renderer = renderer
  }
}`}
            </code>
            </pre>



            <h3>苦労2. ブラウザバックで中途半端な状態になる。</h3>
            ブラウザバックするとcanvasが初期状態となります。ただし、Reactを使ったSPAとして作っているので Singletonのオブジェクトは残っています。<br/>
            そこで、canvasが描画されているかどうかの情報をパラメータとして渡す。
            そして Singletonオブジェクトがあるかどうかで、「初期化する」か「残っている情報を引き継ぐ」かを分けました。<br />
            <pre className={detailstyles.code}>
            <code>{`// 分かり易さのために省略しています。
static getInstance(camera) {
    if (canvas.id == "" || !SingletonRenderer.instance) {
        if (SingletonRenderer.instance) {
          // 情報を引き継いで再構築
        }
        else {
          // 新規構築
        }

        // canvasが初期化されているかどうかの判断に使う
        canvas.id = "threejs"
    }

    return SingletonRenderer.instance;
}
`}
            </code>
            </pre>

            <br/>
            <br/>
            ソースは githubに置きました。

            <br/>
            <br/>
            ※テクスチャを最近買ったapple pencilとipadで作ったのですが、とても描きやすく感動しました。
            初代ipad + 適当なペンじゃこうはいかなかった思い出があります。。
          </div>

        </section>
      </main>

      <footer className={comstyles.footer}>
        © 2021 naghoro.jp
      </footer>

    </div>
  )
}
