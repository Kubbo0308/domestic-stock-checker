package di

import (
	"domestic-stock-checker/infrastructure"
	"domestic-stock-checker/interface/handler"
	"domestic-stock-checker/usecase"
)

func NewStockDI() handler.StockHandler {
	stockPersistence := infrastructure.NewStockPersistence()
	stockUsecase := usecase.NewStockUsecase(stockPersistence)
	return handler.NewStockHandler(stockUsecase)
}
