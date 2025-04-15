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
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

interface ErrorState {
  title: string;
  description: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 4) {
      setInputError("証券番号を入力してください");
    } else {
      setInputError(null);
    }
  };

  const isSearchDisabled = searchTerm.length === 0 || searchTerm.length > 4;

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
        case 404:
          setError({
            title: "あれれ？企業が見つかりません… 😰",
            description: "証券コードが間違ってるかも？ もう一度チェックしてみてください！",
          });
          setIsLoading(false);
          break;
        case 500:
          setError({
            title: "サーバーがちょっと休憩中みたいです 🛠️",
            description: "時間をおいてから、もう一度ためしてみてくださいね。",
          });
          setIsLoading(false);
          break;
        default:
          setError({
            title: "なんだか変なことが起きました 🌀",
            description: "もう一回やってみてください。それでもダメなら、お知らせいただけると助かります！",
          });
          setIsLoading(false);
          break;
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        setError({
          title: "ネットワークエラーかも？ 📡",
          description: "インターネットの接続を確認して、もう一度お試しくださいっ！",
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
    <>
      <Header />
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
                onChange={handleSearchChange}
                className={cn(
                  "text-lg",
                  inputError && "border-destructive border-2"
                )}
              />
              <Button onClick={handleSearch} size="lg" disabled={isSearchDisabled}>
                <IoSearchSharp />
                チェック
              </Button>
            </div>
            {inputError && (
              <p className="text-destructive text-sm">{inputError}</p>
            )}
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
    </>
  );
};

export default Index;
