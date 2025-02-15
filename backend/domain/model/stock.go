package model

type StockInfo struct {
	SettlementLink      string
	CompanyName         string
	CompanyPerformances [][]string
	FinancialStatus     [][]string
	CashFlow            [][]string
	DividendTrend       [][]string
	EPSScore            *float64
}
