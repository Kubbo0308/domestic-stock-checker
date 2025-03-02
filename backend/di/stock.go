package di

import (
	"domestic-stock-checker/infrastructure"
	"domestic-stock-checker/interface/handler"
	"domestic-stock-checker/usecase"
)

func NewStockDI() handler.StockHandler {
	stockPersistence := infrastructure.NewStockPersistence()
	calculatePersistence := infrastructure.NewCalculatePersistence()
	stockUsecase := usecase.NewStockUsecase(stockPersistence, calculatePersistence)
	return handler.NewStockHandler(stockUsecase)
}
