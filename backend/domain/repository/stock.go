package repository

type StockRepository interface {
	FetchStockInfo(securitiesCode string) (string, []string, error)
}
