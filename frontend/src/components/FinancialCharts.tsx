import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CompanyData } from "@/domain.types";
import { Chart } from "./Chart";

const FinancialCharts = ({ company }: { company: CompanyData }) => {
  // Transform data for charts
  const getChartData = (
    data: string[][]
  ): { title: string; chartData: { year: string; revenue: number }[] } => {
    if (!data?.length) {
      return { title: "", chartData: [] };
    }

    const chartData = data.slice(1).map((row: string[]) => ({
      year: row[0],
      revenue: parseFloat(row[1]),
    }));
    return { title: data[0][1], chartData: chartData };
  };

  const profit = getChartData(company.Profit);
  const operatingProfitRate = getChartData(company.OperatingProfitRate);
  const totalAsset = getChartData(company.TotalAsset);
  const eps = getChartData(company.EPS);
  const capitalAdequacyRatio = getChartData(company.CapitalAdequacyRatio);
  const salesCashFlow = getChartData(company.SalesCashFlow);
  const cashEtc = getChartData(company.CashEtc);
  const oneStockDividend = getChartData(company.OneStockDividend);
  const dividendPayoutRatio = getChartData(company.DividendPayoutRatio);

  if (
    profit.chartData.length === 0 &&
    operatingProfitRate.chartData.length === 0 &&
    totalAsset.chartData.length === 0 &&
    eps.chartData.length === 0 &&
    capitalAdequacyRatio.chartData.length === 0 &&
    salesCashFlow.chartData.length === 0 &&
    cashEtc.chartData.length === 0 &&
    oneStockDividend.chartData.length === 0 &&
    dividendPayoutRatio.chartData.length === 0
  ) {
    return (
      <Card className="p-6 backdrop-blur-sm bg-white/50">
        <h2 className="text-2xl font-bold mb-4">財務推移</h2>
        <p className="text-muted-foreground">データが利用できません</p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 backdrop-blur-sm bg-white/50">
        <h2 className="text-2xl font-bold mb-4">財務推移</h2>
        <div className="space-y-8">
          {profit.chartData.length > 0 && (
            <Chart title={profit.title} data={profit.chartData} />
          )}

          {operatingProfitRate.chartData.length > 0 && (
            <Chart
              title={operatingProfitRate.title}
              data={operatingProfitRate.chartData}
            />
          )}

          {totalAsset.chartData.length > 0 && (
            <Chart title={totalAsset.title} data={totalAsset.chartData} />
          )}

          {eps.chartData.length > 0 && (
            <Chart title={eps.title} data={eps.chartData} />
          )}

          {capitalAdequacyRatio.chartData.length > 0 && (
            <Chart
              title={capitalAdequacyRatio.title}
              data={capitalAdequacyRatio.chartData}
            />
          )}

          {salesCashFlow.chartData.length > 0 && (
            <Chart title={salesCashFlow.title} data={salesCashFlow.chartData} />
          )}

          {cashEtc.chartData.length > 0 && (
            <Chart title={cashEtc.title} data={cashEtc.chartData} />
          )}

          {oneStockDividend.chartData.length > 0 && (
            <Chart
              title={oneStockDividend.title}
              data={oneStockDividend.chartData}
            />
          )}

          {dividendPayoutRatio.chartData.length > 0 && (
            <Chart
              title={dividendPayoutRatio.title}
              data={dividendPayoutRatio.chartData}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default FinancialCharts;
