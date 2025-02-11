package usecase

import (
	"domestic-stock-checker/domain/repository"
	"domestic-stock-checker/utils"
)

type StockUsecase interface {
	GetStockInfo(securitiesCode string) (string, [][]string, [][]string, [][]string, [][]string, *int, error)
}

type stockUsecase struct {
	sr repository.StockRepository
}

func NewStockUsecase(sr repository.StockRepository) StockUsecase {
	return &stockUsecase{sr: sr}
}

func (su *stockUsecase) GetStockInfo(securitiesCode string) (string, [][]string, [][]string, [][]string, [][]string, *int, error) {
	companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, err := su.sr.FetchStockInfo(securitiesCode)
	if err != nil {
		return "", nil, nil, nil, nil, nil, err
	}

	companyPerformances = utils.CheckLastRowAndHeader(companyPerformances)
	financialStatus = utils.CheckLastRowAndHeader(financialStatus)
	cashFlow = utils.CheckLastRowAndHeader(cashFlow)
	dividendTrend = utils.CheckLastRowAndHeader(dividendTrend)

	epsScore := su.sr.CheckEPS(companyPerformances)

	return companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, epsScore, nil
}
