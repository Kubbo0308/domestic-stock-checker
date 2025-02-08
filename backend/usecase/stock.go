package usecase

import "domestic-stock-checker/domain/repository"

type StockUsecase interface {
	GetStockInfo(securitiesCode string) (string, error)
}

type stockUsecase struct {
	sr repository.StockRepository
}

func NewStockUsecase(sr repository.StockRepository) StockUsecase {
	return &stockUsecase{sr: sr}
}

func (su *stockUsecase) GetStockInfo(securitiesCode string) (string, error) {
	str, err := su.sr.FetchStockInfo(securitiesCode)
	if err != nil {
		return "", err
	}
	return str, nil
}
