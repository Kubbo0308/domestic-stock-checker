import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSearchSharp } from "react-icons/io5";
import CompanyOverview from "@/components/CompanyOverview";
import FinancialCharts from "@/components/FinancialCharts";
import HealthScore from "@/components/HealthScore";
import Footer from "@/components/Footer";
import { CompanyData } from "@/domain.types";
import LoadingDialog from "@/components/LoadingDialog";
import ErrorDialog from "@/components/ErrorDialog";

interface ErrorState {
  title: string;
  description: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async () => {
    // 既存のリクエストをキャンセル
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 新しいAbortControllerを作成
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/stock?securitiesCode=${searchTerm}`, {
        signal: abortController.signal,
      });
      const data = await res.json();

      switch (res.status) {
        case 200:
          setCompanyData(data);
          setIsLoading(false);
          break;
        case 500:
          setError({
            title: "サーバーエラーが発生しました",
            description: "申し訳ありません。時間を置いて再度お試しください。",
          });
          setIsLoading(false);
          break;
        default:
          setError({
            title: "エラーが発生しました",
            description: "再度お試しください。",
          });
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError({
          title: "エラーが発生しました",
          description: "再度お試しください。",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <Card className="p-8 backdrop-blur-sm bg-white/50">
          <h1 className="text-4xl font-bold text-center mb-8">
            企業健康度チェッカー
          </h1>
          <div className="flex gap-4 max-w-xl mx-auto">
            <Input
              placeholder="証券番号を入力"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg"
            />
            <Button onClick={handleSearch} size="lg">
              <IoSearchSharp />
              チェック
            </Button>
          </div>
        </Card>

        {companyData && (
          <div className="space-y-6">
            <CompanyOverview company={companyData} />
            <HealthScore company={companyData} />
            <FinancialCharts company={companyData} />
          </div>
        )}

        <Footer />
      </div>
      <LoadingDialog open={isLoading} onCancel={handleCancel} />
      <ErrorDialog
        open={error !== null}
        onClose={() => setError(null)}
        title={error?.title ?? ""}
        description={error?.description ?? ""}
      />
    </div>
  );
};

export default Index;
