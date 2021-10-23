import Head from 'next/head'

import comstyles from '../../styles/com.module.css'
import detailstyles from '../../styles/detail.module.css'

import Link from 'next/link'

export default function Home() {

  return (
    <div className="container">
      <Head>
        <meta charSet="utf-8"></meta>
        <title>ポートフォリオ VRについて</title>
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
              VRについて
            </h1>

            <nav className={detailstyles.nav}>
              <a href="#tanuki">VRChat用アバターの作成</a>
              <a href="#spot">VRChat用自動で追いかけるスポットライトの作成</a>
              <a href="#oculus">Oculus QuestでVRMを動かす</a>
            </nav>

            <h2 id="tanuki">VRChat用アバターの作成</h2>

            VRChatで使えるたぬきアバターを作りました。<br />
            モデリングはBlenderを使い、Shape Keysで口が開くようにしました。また、Unityでダイナミックボーンを使って尻尾が揺れるようにしました。<br />
            <br />
            <div className={detailstyles.image}>
              <img src="/xr-portfolio/image/naghoroS.png" />
            </div>
            <br />

            次にモデリングする時は以下のように作ってみようと思います。
            <ul>
              <li>メッシュは、最初は荒めに切っていく。</li>
              <li>服のボーンのウェイトは、ウェイト転送する。</li>
            </ul>

            ※たぬきみたいな人生っていいなと思っていたので、VR上で実現しました。<br />

            <h2>VRChat用自動で追いかけるピンスポの作成</h2>
            Udon# を使って作りました。

            <div>
              <br />
              <br />
              TODO: 動画を取って載せる
              <br />
              <br />
              <br />
            </div>

            以下のSTEPで動作しています。
            <ul>
              <li>ユーザーのIDを取る。</li>
              <li>IDからユーザーの位置を取得する。</li>
              <li>スポットライトの向きをユーザーの位置に向ける。</li>
            </ul>

            ※Vket Mallでギミックに当選したことをきっかけに作りました。<br />
            昔演劇をやっていたことがあったので、「VRでは誰かがライトを操作する必要が無い」のは面白いと感じました。

            <h2>Oculus QuestでVRMを動かす</h2>

            VRMを読み込み、アニメーションとしてUnity Chanを使わせて貰いOculusQuest上で動かしました。
            <br />
            <br />

            <div className={detailstyles.movie}>
              <video src="/xr-portfolio/movie/jp.naghoro.OculusAvatar-20210818-220442_Trim.mp4" poster="/xr-portfolio/image/vrposter1.png" controls></video>
            </div>
            <br />

            ※adbがAndroidStudioのものと競合してはまりました。
          </div>

        </section>
      </main>

      <footer className={comstyles.footer}>
        © 2021 naghoro.jp
      </footer>

    </div>
  )
}
