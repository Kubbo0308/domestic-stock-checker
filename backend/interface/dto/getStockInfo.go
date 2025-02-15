package dto

import (
	"domestic-stock-checker/domain/model"
	"strings"
)

func TransferStockInfo(settlementLink string, companyName string, profit [][]string, operatingProfitRate [][]string, totalAsset [][]string, eps [][]string, capitalAdequacyRatio [][]string, salesCashFlow [][]string, cashEtc [][]string, oneStockDividend [][]string, dividendPayoutRatio [][]string, epsScore *float64) model.StockInfo {
	companyNameTitle := strings.Split(companyName, " ")
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
		EPSScore:             epsScore,
	}
}
