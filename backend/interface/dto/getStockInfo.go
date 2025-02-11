package dto

import (
	"domestic-stock-checker/domain/model"
	"strings"
)

func TransferStockInfo(companyName string, companyPerformances [][]string, financialStatus [][]string, cashFlow [][]string, dividendTrend [][]string, epsScore *int) model.StockInfo {
	companyNameTitle := strings.Split(companyName, " ")
	return model.StockInfo{
		CompanyName:         companyNameTitle[1],
		CompanyPerformances: companyPerformances,
		FinancialStatus:     financialStatus,
		CashFlow:            cashFlow,
		DividendTrend:       dividendTrend,
		EPSScore:            epsScore,
	}
}
