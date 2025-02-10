package usecase

import "domestic-stock-checker/domain/repository"

type StockUsecase interface {
	GetStockInfo(securitiesCode string) (string, []string, []string, []string, []string, error)
}

type stockUsecase struct {
	sr repository.StockRepository
}

func NewStockUsecase(sr repository.StockRepository) StockUsecase {
	return &stockUsecase{sr: sr}
}

func (su *stockUsecase) GetStockInfo(securitiesCode string) (string, []string, []string, []string, []string, error) {
	companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, err := su.sr.FetchStockInfo(securitiesCode)
	if err != nil {
		return "", nil, nil, nil, nil, err
	}
	return companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, nil
}
