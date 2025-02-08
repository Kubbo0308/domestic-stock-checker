package infrastructure

import "domestic-stock-checker/domain/repository"

type stockPersistence struct{}

func NewStockPersistence() repository.StockRepository {
	return &stockPersistence{}
}

func (sp *stockPersistence) FetchStockInfo(secuririesCode string) (string, error) {
	return "", nil
}
