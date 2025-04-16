import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO from "@/components/SEO";

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="利用規約"
        description="企業健康度チェッカーの利用規約。サービスの利用条件について説明します。"
        keywords="利用規約, サービス条件, 免責事項"
        noIndex={true}
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Card className="p-8 backdrop-blur-sm bg-white/50">
            <h1 className="text-3xl font-bold mb-6">利用規約</h1>

            <div className="space-y-6 text-gray-700">
              <section>
                <p className="italic">
                  この利用規約（以下「本規約」）は、企業健康度チェッカー（以下「当サービス」）の利用条件を定めるものです。
                  ユーザーの皆様は、本規約に同意の上、当サービスをご利用ください。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  1. サービスの概要
                </h2>
                <p>
                  当サービスは、企業の財務データを分析し、投資判断に役立つ情報を提供するウェブアプリケーションです。
                  ユーザーは証券コードを入力することで、財務データの健全性を確認することができます。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. 利用条件</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    ユーザーは、自己の責任において当サービスを利用するものとします。
                  </li>
                  <li>
                    ユーザーは、当サービスの利用にあたり、法令、本規約および公序良俗に反する行為を行わないものとします。
                  </li>
                  <li>
                    当サービスの利用は無料ですが、将来的に有料機能が追加される可能性があります。
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. 免責事項</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    当サービスで提供される情報は、投資判断の参考情報であり、投資の成功を保証するものではありません。
                  </li>
                  <li>
                    実際の投資判断はユーザー自身の責任において行ってください。
                  </li>
                  <li>
                    当サービスの利用によって生じたいかなる損害についても、運営者は責任を負いません。
                  </li>
                  <li>
                    当サービスは、予告なくメンテナンスや機能更新を行うことがあります。
                  </li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. 知的財産権</h2>
                <p>
                  当サービスに関する著作権、商標権その他の知的財産権は、運営者または正当な権利者に帰属します。
                  ユーザーは、当サービスの内容を無断で複製、転載、改変、販売などの行為を行ってはなりません。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  5. サービスの変更・中断・終了
                </h2>
                <p>
                  運営者は、以下の場合に、予告なく当サービスの全部または一部の提供を変更、中断、または終了することがあります：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>システムの保守点検または更新を行う場合</li>
                  <li>
                    火災、停電、天災などの不可抗力により、サービスの提供が困難になった場合
                  </li>
                  <li>その他、運営者が必要と判断した場合</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. 規約の変更</h2>
                <p>
                  運営者は、必要に応じて本規約を変更することがあります。
                  変更後の規約は、当サービス上で公開された時点から効力を生じるものとします。
                  継続して当サービスを利用する場合、ユーザーは変更後の規約に同意したものとみなされます。
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">
                  7. 準拠法と管轄裁判所
                </h2>
                <p>
                  本規約の解釈にあたっては、日本法を準拠法とします。
                  当サービスに関連する紛争については、運営者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
              </section>

              <p className="mt-8 text-sm">最終更新日：2025年4月16日</p>
            </div>
          </Card>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
