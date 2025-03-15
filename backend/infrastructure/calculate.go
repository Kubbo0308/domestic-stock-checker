package infrastructure

import (
	"domestic-stock-checker/domain/repository"
	"domestic-stock-checker/utils"
)

type calculatePersistence struct{}

func NewCalculatePersistence() repository.CalculateRepository {
	return &calculatePersistence{}
}

// CalculateMonetaryScore は収益や総資産などの金額データ（単位：兆、億、万対応）に対して、
// 各年度間の成長率の一貫性と平均成長率からスコア（0～100点）を算出する例
func (cp *calculatePersistence) CalculateMonetaryScore(data [][]string) *float64 {
	if len(data) < 2 {
		return nil
	}
	var values []float64
	for i := 1; i < len(data); i++ {
		if len(data[i]) < 2 {
			continue
		}
		v, err := utils.ParseMonetaryValue(data[i][1])
		if err != nil {
			continue
		}
		values = append(values, v)
	}
	if len(values) < 2 {
		return nil
	}

	growthRates := calculateGrowthRates(values)

	// 一貫性: 正の成長率の割合
	positiveCount := 0
	for _, g := range growthRates {
		if g > 0 {
			positiveCount++
		}
	}
	consistency := float64(positiveCount) / float64(len(growthRates))

	avgGrowth := utils.Average(growthRates)

	// ここでは平均成長率が 8% であれば 100点とする例
	growthScore := (avgGrowth / 0.08) * 100
	if growthScore > 100 {
		growthScore = 100
	}
	if growthScore < 0 {
		growthScore = 0
	}

	// 一貫性を百分率化して50%、平均成長率を50%として加重平均
	finalScore := 0.5*(consistency*100) + 0.5*growthScore
	return &finalScore
}

// CalculatePercentageScore は、営業利益率などパーセント値のデータについて、
// 各年度の成長率を考慮したスコア（0～100）を算出する例
func (cp *calculatePersistence) CalculatePercentageScore(data [][]string) *float64 {
	if len(data) < 2 {
		return nil
	}
	var values []float64
	for i := 1; i < len(data); i++ {
		if len(data[i]) < 2 || data[i][1] == "-" {
			continue
		}
		v, err := utils.ParsePercentageValue(data[i][1])
		if err != nil {
			continue
		}
		values = append(values, v)
	}
	if len(values) < 2 {
		return nil
	}
	growthRates := calculateGrowthRates(values)

	positiveCount := 0
	for _, g := range growthRates {
		if g > 0 {
			positiveCount++
		}
	}
	consistency := float64(positiveCount) / float64(len(growthRates))
	avgGrowth := utils.Average(growthRates)

	// ここでは、平均成長率が 8% であれば 100点とする例
	growthScore := (avgGrowth / 0.08) * 100
	if growthScore > 100 {
		growthScore = 100
	}
	if growthScore < 0 {
		growthScore = 0
	}
	finalScore := 0.5*(consistency*100) + 0.5*growthScore
	return &finalScore
}

// CalculateCapitalAdequacyScore は株主資本比率の最新値から線形にスコアを算出する例
func (cp *calculatePersistence) CalculateCapitalAdequacyScore(data [][]string) *float64 {
	if len(data) < 2 {
		return nil
	}
	var latest float64 = 0.0
	for i := 1; i < len(data); i++ {
		if len(data[i]) < 2 {
			continue
		}
		v, err := utils.ParsePercentageValue(data[i][1])
		if err != nil {
			continue
		}
		latest = v // データは時系列順と仮定し、最新値は最後の有効な値
	}
	var score float64
	if latest < 40 {
		score = 0
	} else if latest < 60 {
		score = 33 + (latest-40)*((66-33)/20.0)
	} else if latest < 80 {
		score = 66 + (latest-60)*((88-66)/20.0)
	} else {
		score = 100
	}
	return &score
}

// CalculateDividendPayoutScore は配当性向について、最新値から線形にスコアを算出する例
// 例として、理想値20%からの乖離で減点
func (cp *calculatePersistence) CalculateDividendPayoutScore(data [][]string) *float64 {
	if len(data) < 2 {
		return nil
	}
	var latest float64 = 0.0
	for i := 1; i < len(data); i++ {
		if len(data[i]) < 2 || data[i][1] == "-" {
			continue
		}
		v, err := utils.ParsePercentageValue(data[i][1])
		if err != nil {
			continue
		}
		latest = v
	}
	// 例: 理想値20%に対して、乖離1%あたり2点減点する
	score := 100 - 2*absFloat(latest-20)
	if score < 0 {
		score = 0
	}
	if score > 100 {
		score = 100
	}
	return &score
}

func absFloat(x float64) float64 {
	if x < 0 {
		return -x
	}
	return x
}

// calculateGrowthRates は連続する数値から各年度間の成長率を計算する
func calculateGrowthRates(values []float64) []float64 {
	var growthRates []float64
	for i := 1; i < len(values); i++ {
		if values[i-1] == 0 {
			growthRates = append(growthRates, 0)
		} else {
			growth := (values[i] - values[i-1]) / values[i-1]
			growthRates = append(growthRates, growth)
		}
	}
	return growthRates
}
