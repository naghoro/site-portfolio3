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

            <nav>
              <a>VRChat用アバターの作成</a>
              <a>VRChat用自動で追いかけるスポットライトの作成</a>
              <a>Oculus QuestでVRMを動かす</a>
            </nav>

            <h2>VRChat用アバターの作成</h2>

            VRChatで使えるたぬきアバターを作りました。
            モデリングはBlenderを使い、UnityでVRChatにアップロードします。Shape Keyで口が開く、ダイナミックボーンで尻尾が揺れるところまで設定しました。<br />
            <br />
            <div className={detailstyles.image}>
              <img src="/xr-portfolio/image/naghoroS.png" />
            </div>
            <br />
            初めての本格的なモデリングで、「ワニでも分かる」と「美少女...」を参考にさせて頂いて作りました。
            <br />
            <br />

            次にモデリングする時は以下のことを気を付けたいです。
            <ul>
              <li>メッシュは、最初は荒めに切っていく</li>
              <li>服のボーンのウェイトは、する。今回は体は削った。</li>
            </ul>

            <br />
            ※たぬきみたいな人生がいいなと思っていたので、その人生はVR上で実現しました。<br />
            　この姿のおかげで、少しVRに入り易くなって良かったと思っています。

            <h2>VRChat用自動で追いかけるスポットライトの作成</h2>

            Udon# を使って作りました。
            ユーザーのIDを取る。ユーザーの位置を取得する。スポットライトの向きをユーザーの位置に向ける。
            <br />
            <br />

            ※Virtual Marketでギミックに当選したことをきっかけに作りました。<br />
            　昔演劇をやっていたことがあったので、VR上に演劇をどう表現できるか考えている思いもあります。

            <h2>Oculus QuestでVRMを動かす</h2>

            やっていることはシンプルなのですが、VRMを読み込み、アニメーションとしてUnity Chanのものを使わせてもらっただけのものです。
            <br />
            <br />

            <div className={detailstyles.movie}>
              <video src="/xr-portfolio/movie/jp.naghoro.OculusAvatar-20210818-220442_Trim.mp4" controls></video>
            </div>
            <br />

            ※Oculus Quest2を買ったので、アプリの作り方を試してみたい。VRMって良く聞くけど何なのか知りたいという気持ちで作りました。
          </div>

        </section>
      </main>

      <footer className={comstyles.footer}>
        © 2021 naghoro.jp
      </footer>

    </div>
  )
}
