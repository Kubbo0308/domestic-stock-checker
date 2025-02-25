import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { CompanyData } from "@/domain.types";

const FinancialCharts = ({ company }: { company: CompanyData }) => {
  // Transform data for charts
  const getChartData = (data: string[][]) => {
    if (!data?.length) {
      return [];
    }

    return data.slice(1).map((row: string[]) => ({
      year: row[0],
      revenue: parseFloat(row[1]),
    }));
  };

  const profits = getChartData(company.Profit);
  const operatingProfitRate = getChartData(company.OperatingProfitRate);

  if (profits.length === 0) {
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
          <div className="h-[300px]">
            <h3 className="text-lg font-semibold mb-2">利益推移</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[300px]">
            <h3 className="text-lg font-semibold mb-2">営業利益率推移</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={operatingProfitRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="roa"
                  stroke="#ffc658"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FinancialCharts;
