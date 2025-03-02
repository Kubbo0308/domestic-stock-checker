import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CompanyData } from "@/domain.types";

const HealthScore = ({ company }: { company: CompanyData }) => {
  const [progress, setProgress] = useState(0);

  const calculateHealthScore = () => {
    return Math.min(100, Math.max(0, Math.trunc(company.TotalScore)));
  };

  const getHealthComment = (score: number) => {
    if (score >= 70) {
      return "非常に健全な財務状態です。継続的な成長が期待できます。";
    } else if (score >= 40) {
      return "おおむね健全な財務状態ですが、一部改善の余地があります。";
    }
    return "財務状態に注意が必要です。詳細な分析をお勧めします。";
  };

  const score = calculateHealthScore();
  const getScoreColor = () => {
    if (score >= 70) return "bg-health-good";
    if (score >= 40) return "bg-health-warning";
    return "bg-health-bad";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 backdrop-blur-sm bg-white/50">
        <h2 className="text-2xl font-bold mb-4">健康度スコア</h2>
        <div className="space-y-4">
          <div className="relative pt-4">
            <Progress value={progress} className={getScoreColor()} />
            <span className="absolute right-0 top-0 text-2xl font-bold">
              {score}/100
            </span>
          </div>
          <div className="mt-4 p-4 bg-white/30 rounded-lg">
            <p className="text-lg">{getHealthComment(score)}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HealthScore;
