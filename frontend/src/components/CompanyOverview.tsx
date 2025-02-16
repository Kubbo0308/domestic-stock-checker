import { Card } from "@/components/ui/card";

const CompanyOverview = ({ company }: { company: any }) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/50">
      <h2 className="text-2xl font-bold mb-4">企業概要</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/50">
          <p className="text-sm text-muted-foreground">企業名</p>
          <p className="text-xl font-semibold">{company.CompanyName}</p>
        </div>
        {/* Add more company information here */}
      </div>
    </Card>
  );
};

export default CompanyOverview;
