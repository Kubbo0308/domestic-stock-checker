import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Card className="p-8 backdrop-blur-sm bg-white/50">
            <h1 className="text-3xl font-bold mb-6">プライバシーポリシー</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. 個人情報の取り扱いについて</h2>
                <p>
                  企業健康度チェッカー（以下「当サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
                  本プライバシーポリシーでは、当サービスにおける個人情報の取り扱いについて説明します。
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">2. 収集する情報</h2>
                <p className="mb-2">
                  当サービスでは、以下の情報を収集する場合があります：
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>検索履歴（検索された企業名や証券コード）</li>
                  <li>アクセスログ（IPアドレス、ブラウザ情報など）</li>
                  <li>お問い合わせフォームから送信された情報</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">3. 情報の利用目的</h2>
                <p className="mb-2">
                  収集した情報は、以下の目的で利用します：
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>サービスの提供と改善</li>
                  <li>ユーザーサポートの提供</li>
                  <li>サービスの利用状況の分析</li>
                  <li>不正アクセスの防止</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">4. 情報の共有</h2>
                <p>
                  当サービスは、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
                  ただし、以下の場合には情報を共有することがあります：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>法令に基づく要請があった場合</li>
                  <li>当サービスの権利や財産を保護する必要がある場合</li>
                  <li>緊急事態においてユーザーや公衆の安全を保護する必要がある場合</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Cookieの使用</h2>
                <p>
                  当サービスでは、ユーザー体験の向上やサービス改善のためにCookieを使用することがあります。
                  ブラウザの設定でCookieを無効にすることも可能ですが、一部機能が正常に動作しなくなる場合があります。
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">6. セキュリティ</h2>
                <p>
                  当サービスは、収集した情報の安全性確保のために適切な技術的・組織的措置を講じています。
                  ただし、インターネット上の通信に完全な安全性を保証することはできません。
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">7. プライバシーポリシーの変更</h2>
                <p>
                  当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。
                  重要な変更がある場合は、サービス上で通知します。
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">8. お問い合わせ</h2>
                <p>
                  プライバシーポリシーに関するご質問やご意見は、お問い合わせフォームよりお寄せください。
                </p>
              </section>
              
              <p className="mt-8 text-sm">
                最終更新日：{new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日
              </p>
            </div>
          </Card>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;