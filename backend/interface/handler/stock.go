package handler

import (
	"domestic-stock-checker/interface/dto"
	"domestic-stock-checker/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type StockHandler interface {
	GetStockInfo(c *gin.Context)
}

type stockHandler struct {
	su usecase.StockUsecase
}

func NewStockHandler(su usecase.StockUsecase) StockHandler {
	return &stockHandler{su: su}
}
func (sh *stockHandler) GetStockInfo(c *gin.Context) {
	securitiesCode := c.Query("securitiesCode")
	if securitiesCode == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing securitiesCode"})
		return
	}
	settlementLink, companyName, profit, operatingProfitRate, totalAsset, eps, capitalAdequacyRatio, salesCashFlow, cashEtc, oneStockDividend, dividendPayoutRatio, profitScore, operatingProfitRateScore, totalAssetScore, epsScore, capitalAdequacyRatioScore, salesCashFlowScore, cashEtcScore, oneStockDividendScore, dividendPayoutRatioScore, err := sh.su.GetStockInfo(securitiesCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
		return
	}

	res := dto.TransferStockInfo(settlementLink, companyName, profit, operatingProfitRate, totalAsset, eps, capitalAdequacyRatio, salesCashFlow, cashEtc, oneStockDividend, dividendPayoutRatio, profitScore, operatingProfitRateScore, totalAssetScore, epsScore, capitalAdequacyRatioScore, salesCashFlowScore, cashEtcScore, oneStockDividendScore, dividendPayoutRatioScore)
	c.JSON(http.StatusOK, res)
}
