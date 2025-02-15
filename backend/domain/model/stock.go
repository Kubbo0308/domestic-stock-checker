package model

type StockInfo struct {
	SettlementLink       string
	CompanyName          string
	Profit               [][]string
	OperatingProfitRate  [][]string
	TotalAsset           [][]string
	EPS                  [][]string
	CapitalAdequacyRatio [][]string
	SalesCashFlow        [][]string
	CashEtc              [][]string
	OneStockDividend     [][]string
	DividendPayoutRatio  [][]string
	EPSScore             *float64
}
