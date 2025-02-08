package handler

import (
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
	_, err := sh.su.GetStockInfo(securitiesCode)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	}
	c.JSON(http.StatusOK, nil)
}
