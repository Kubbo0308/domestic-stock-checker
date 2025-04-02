
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const UsageGuide = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <Card className="p-8 backdrop-blur-sm bg-white/50">
            <h1 className="text-3xl font-bold mb-6">使い方ガイド</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">企業健康度チェッカーとは</h2>
                <p className="text-gray-700">
                  企業健康度チェッカーは、企業の財務データを分析し、投資判断に役立つ情報を提供するツールです。
                  企業名や証券コードを入力するだけで、財務データの健全性を視覚的に確認できます。
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">基本的な使い方</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>トップページの検索ボックスに企業名または証券コードを入力します。</li>
                  <li>「検索」ボタンをクリックします。</li>
                  <li>企業の基本情報、健康度スコア、財務チャートが表示されます。</li>
                  <li>健康度スコアと診断結果から投資判断の参考にします。</li>
                </ol>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">健康度スコアについて</h2>
                <p className="text-gray-700">
                  健康度スコアは0〜100の数値で表示され、企業の財務健全性を示します。
                  スコアは以下のように解釈できます：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                  <li><span className="font-semibold text-green-600">80点以上</span>：非常に健全な財務状態。投資価値あり。</li>
                  <li><span className="font-semibold text-amber-500">60〜79点</span>：おおむね健全だが改善の余地あり。どちらとも言えない。</li>
                  <li><span className="font-semibold text-red-500">60点未満</span>：財務状態に注意が必要。様子見が推奨。</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">財務チャートの見方</h2>
                <p className="text-gray-700">
                  財務チャートでは、企業の収益推移を確認できます。
                  上昇トレンドは青紫色、下降トレンドは赤色で表示されます。
                  企業の成長性や安定性を判断する材料としてご活用ください。
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">注意事項</h2>
                <p className="text-gray-700">
                  当サービスの分析結果はあくまで参考情報です。
                  実際の投資判断は、ご自身の責任において行ってください。
                  より詳細な分析や最新情報は、証券会社や公式の財務情報を確認することをお勧めします。
                </p>
              </section>
            </div>
          </Card>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UsageGuide;