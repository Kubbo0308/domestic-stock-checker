import { useEffect, useState } from "react";
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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      console.log(`http://localhost:8080/stock?securitiesCode=${searchTerm}`);
      const res = await fetch(
        `http://localhost:8080/stock?securitiesCode=${searchTerm}`
      );
      const { data } = await res.json();

      switch (res.status) {
        case 200:
          setCompanyData(data);
          console.log(data);
          console.log("succeded");
          setIsLoading(false);
          break;
        default:
          setIsLoading(false);
      }
    } catch (error) {
      console.error("リクエストエラー", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(companyData);
  }, [companyData]);

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
      <LoadingDialog open={isLoading} />
    </div>
  );
};

export default Index;
