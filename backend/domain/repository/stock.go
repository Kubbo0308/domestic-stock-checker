package repository

type StockRepository interface {
	FetchStockInfo(securitiesCode string) (string, [][]string, [][]string, [][]string, [][]string, error)
	CheckEPS(companyPerformances [][]string) *int
}
