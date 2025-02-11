package model

type StockInfo struct {
	CompanyName         string
	CompanyPerformances [][]string
	FinancialStatus     [][]string
	CashFlow            [][]string
	DividendTrend       [][]string
	EPSScore            *int
}
