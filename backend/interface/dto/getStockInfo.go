package dto

import "domestic-stock-checker/domain/model"

func TransferStockInfo(companyName string, companyPerformances []string, financialStatus []string, cashFlow []string, dividendTrend []string) model.StockInfo {
	return model.StockInfo{
		CompanyName:         companyName,
		CompanyPerformances: companyPerformances,
		FinancialStatus:     financialStatus,
		CashFlow:            cashFlow,
		DividendTrend:       dividendTrend,
	}
}
