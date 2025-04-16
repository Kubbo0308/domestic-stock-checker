import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="ページが見つかりません | 404エラー"
        description="お探しのページは見つかりませんでした。企業健康度チェッカーのトップページへお戻りください。"
        keywords="404, ページが見つかりません, エラー"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center py-12">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">
              ページが見つかりませんでした
            </p>
            <a
              href="/"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              トップページに戻る
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
