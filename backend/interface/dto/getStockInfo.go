package dto

import (
	"domestic-stock-checker/domain/model"
	"strings"
)

func TransferStockInfo(settlementLink, companyName string, profit, operatingProfitRate, totalAsset, eps, capitalAdequacyRatio, salesCashFlow, cashEtc, oneStockDividend, dividendPayoutRatio [][]string, profitScore, operatingProfitRateScore, totalAssetScore, epsScore, capitalAdequacyRatioScore,
	salesCashFlowScore, cashEtcScore, oneStockDividendScore, dividendPayoutRatioScore *float64) model.StockInfo {
	companyNameTitle := strings.Split(companyName, " ")

	// 各指標に対する重み
	weights := []struct {
		score  *float64
		weight float64
	}{
		{profitScore, 0.10},
		{operatingProfitRateScore, 0.10},
		{totalAssetScore, 0.10},
		{epsScore, 0.30},
		{capitalAdequacyRatioScore, 0.10},
		{salesCashFlowScore, 0.10},
		{cashEtcScore, 0.10},
		{oneStockDividendScore, 0.10},
		{dividendPayoutRatioScore, 0.10},
	}

	var weightedSum float64
	var totalWeight float64
	var totalScore float64

	// nil でない各指標について、重み付きスコアを加算
	for _, item := range weights {
		if item.score != nil {
			weightedSum += *item.score * item.weight
			totalWeight += item.weight
		}
	}

	// 全て nil の場合は 0 を返す
	if totalWeight == 0 {
		totalScore = 0
	}

	// 重みの合計で割って正規化（0～100点）
	totalScore = weightedSum / totalWeight

	return model.StockInfo{
		SettlementLink:       settlementLink,
		CompanyName:          companyNameTitle[1],
		Profit:               profit,
		OperatingProfitRate:  operatingProfitRate,
		TotalAsset:           totalAsset,
		EPS:                  eps,
		CapitalAdequacyRatio: capitalAdequacyRatio,
		SalesCashFlow:        salesCashFlow,
		CashEtc:              cashEtc,
		OneStockDividend:     oneStockDividend,
		DividendPayoutRatio:  dividendPayoutRatio,
		TotalScore:           totalScore,
	}
}
