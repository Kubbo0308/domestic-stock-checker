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
	companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, epsScore, err := sh.su.GetStockInfo(securitiesCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}

	res := dto.TransferStockInfo(companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, epsScore)
	c.JSON(http.StatusOK, res)
}
