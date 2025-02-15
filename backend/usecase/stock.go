package usecase

import (
	"domestic-stock-checker/domain/constants"
	"domestic-stock-checker/domain/repository"
	"domestic-stock-checker/utils"
)

type StockUsecase interface {
	GetStockInfo(securitiesCode string) (string, string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, *float64, error)
}

type stockUsecase struct {
	sr repository.StockRepository
}

func NewStockUsecase(sr repository.StockRepository) StockUsecase {
	return &stockUsecase{sr: sr}
}

func (su *stockUsecase) GetStockInfo(securitiesCode string) (string, string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, [][]string, *float64, error) {
	// データ取得
	settlementLink, companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, err := su.sr.FetchStockInfo(securitiesCode)
	if err != nil {
		return "", "", nil, nil, nil, nil, nil, nil, nil, nil, nil, nil, err
	}

	// フォーマット
	companyPerformances = utils.CheckLastRowAndHeader(companyPerformances)
	financialStatus = utils.CheckLastRowAndHeader(financialStatus)
	cashFlow = utils.CheckLastRowAndHeader(cashFlow)
	dividendTrend = utils.CheckLastRowAndHeader(dividendTrend)

	// データを抽出
	profit := utils.ExtractColumn(companyPerformances, constants.Profit)
	operatingProfitRate := utils.ExtractColumn(companyPerformances, constants.OperatingProfitRate)
	totalAsset := utils.ExtractColumn(financialStatus, constants.TotalAsset)
	eps := utils.ExtractColumn(companyPerformances, constants.EPS)
	capitalAdequacyRatio := utils.ExtractColumn(financialStatus, constants.CapitalAdequacyRatio)
	salesCashFlow := utils.ExtractColumn(cashFlow, constants.SalesCashFlow)
	cashEtc := utils.ExtractColumn(cashFlow, constants.CashEtc)
	oneStockDividend := utils.ExtractColumn(dividendTrend, constants.OneStockDividend)
	dividendPayoutRatio := utils.ExtractColumn(dividendTrend, constants.DividendPayoutRatio)

	epsScore := su.sr.CheckEPS(eps)

	return settlementLink, companyName, profit, operatingProfitRate, totalAsset, eps, capitalAdequacyRatio, salesCashFlow, cashEtc, oneStockDividend, dividendPayoutRatio, epsScore, nil
}
