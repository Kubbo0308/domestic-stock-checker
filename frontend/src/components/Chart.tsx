import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ChartProps {
  title: string;
  data: {
    year: string;
    revenue: number;
  }[];
  yAxis?: string;
  strokeColor?: string;
}

export const Chart = ({
  title,
  data,
  yAxis = "",
  strokeColor = "#82ca9d",
}: ChartProps) => {
  return (
    <div className="h-[300px]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey={yAxis} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={strokeColor}
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
  );
};
