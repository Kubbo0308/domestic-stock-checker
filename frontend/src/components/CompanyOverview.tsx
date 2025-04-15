import { Card } from "@/components/ui/card";
import { IR_BANK_URL } from "@/const";
import { CompanyData } from "@/domain.types";
import { ExternalLink } from "lucide-react";

const CompanyOverview = ({ company }: { company: CompanyData }) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/50">
      <h2 className="text-2xl font-bold mb-4">企業概要</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/50">
          <p className="text-sm text-muted-foreground">企業名</p>
          <p className="text-xl font-semibold">{company.CompanyName}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/50">
          <p className="text-sm text-muted-foreground">詳細情報</p>
          <a
            href={`${IR_BANK_URL}${company.SettlementLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline mt-1"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            IRバンクで詳細を見る
          </a>
        </div>
      </div>
    </Card>
  );
};

export default CompanyOverview;
