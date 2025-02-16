import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CompanyOverview from "@/components/CompanyOverview";
import FinancialCharts from "@/components/FinancialCharts";
import HealthScore from "@/components/HealthScore";
import Footer from "@/components/Footer";
import { mockCompanyData } from "@/data/mockCompanyData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyData, setCompanyData] = useState<any>(null);

  const handleSearch = async () => {
    // 実際のアプリケーションではAPIコールを行います
    // 今はモックデータを使用します
    setCompanyData(mockCompanyData);
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
              placeholder="企業名または証券番号を入力"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg"
            />
            <Button onClick={handleSearch} size="lg">
              <Search className="mr-2" />
              検索
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
    </div>
  );
};

export default Index;
