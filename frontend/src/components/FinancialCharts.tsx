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

const FinancialCharts = ({ company }: { company: any }) => {
  // Transform data for charts
  const getChartData = () => {
    if (!company?.CompanyPerformances?.length) {
      return [];
    }

    return company.CompanyPerformances.slice(1).map((data: any) => ({
      year: data[0],
      revenue: parseFloat(data[1]),
      eps: parseFloat(data[4]),
      roe: parseFloat(data[6]),
      roa: parseFloat(data[7]),
    }));
  };

  const chartData = getChartData();

  if (chartData.length === 0) {
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
            <h3 className="text-lg font-semibold mb-2">EPS推移</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="eps"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[300px]">
            <h3 className="text-lg font-semibold mb-2">ROE/ROA推移</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="roe"
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
