package infrastructure

import (
	"domestic-stock-checker/domain/repository"
	"strconv"
	"strings"
)

type calculatePersistence struct{}

func NewCalculatePersistence() repository.CalculateRepository {
	return &calculatePersistence{}
}

func (cp *calculatePersistence) CalculateConsistency(data [][]string) float64 {
	if len(data) < 2 {
		return 0.0
	}

	// 収益値（兆単位）を格納するスライス
	var values []float64

	// ヘッダーを除いて各行の収益をパースする
	for i := 1; i < len(data); i++ {
		// 例: "0.85兆" から "0.85" を取り出す
		s := strings.TrimSpace(data[i][1])
		s = strings.TrimSuffix(s, "兆")
		v, err := strconv.ParseFloat(s, 64)
		if err != nil {
			// パースに失敗した場合はスキップ
			continue
		}
		values = append(values, v)
	}

	// 十分なデータがなければ 0 点
	if len(values) < 2 {
		return 0.0
	}

	// 各年度間の成長率を計算
	var growthRates []float64
	for i := 1; i < len(values); i++ {
		// 成長率 = (今年の収益 - 前年の収益) / 前年の収益
		growth := (values[i] - values[i-1]) / values[i-1]
		growthRates = append(growthRates, growth)
	}

	// 一貫性：正の成長率となった年度の割合を求める
	var positiveCount int
	var sumGrowth float64
	for _, g := range growthRates {
		if g > 0 {
			positiveCount++
		}
		sumGrowth += g
	}
	consistency := float64(positiveCount) / float64(len(growthRates))

	// 平均成長率
	avgGrowth := sumGrowth / float64(len(growthRates))

	// 例として、平均成長率が 10% (0.10) であれば 100 点、10%以上は飽和するように正規化
	growthScore := (avgGrowth / 0.10) * 100
	if growthScore > 100 {
		growthScore = 100
	}
	if growthScore < 0 {
		growthScore = 0
	}

	// 重み例：一貫性 50%、平均成長率 50%
	finalScore := 0.5*(consistency*100) + 0.5*growthScore

	return finalScore
}
