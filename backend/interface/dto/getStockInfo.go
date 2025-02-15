package dto

import (
	"domestic-stock-checker/domain/model"
	"strings"
)

func TransferStockInfo(settlementLink string, companyName string, companyPerformances [][]string, financialStatus [][]string, cashFlow [][]string, dividendTrend [][]string, epsScore *float64) model.StockInfo {
	companyNameTitle := strings.Split(companyName, " ")
	return model.StockInfo{
		SettlementLink:      settlementLink,
		CompanyName:         companyNameTitle[1],
		CompanyPerformances: companyPerformances,
		FinancialStatus:     financialStatus,
		CashFlow:            cashFlow,
		DividendTrend:       dividendTrend,
		EPSScore:            epsScore,
	}
}
