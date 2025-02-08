package handler

import (
	"domestic-stock-checker/usecase"
	"net/http"

	"github.com/gin-gonic/gin"
)

type StockHandler interface {
	GetStockInfo(c *gin.Context) error
}

type stockHandler struct {
	su usecase.StockUsecase
}

func NewStockHandler(su usecase.StockUsecase) StockHandler {
	return &stockHandler{su: su}
}
func (sh *stockHandler) GetStockInfo(c *gin.Context) error {
	c.JSON(http.StatusOK, nil)
	return nil
}
