package dto

import "domestic-stock-checker/domain/model"

func TransferStockInfo(companyName string, companyPerformances []string) model.StockInfo {
	return model.StockInfo{
		CompanyName:         companyName,
		CompanyPerformances: companyPerformances,
	}
}
