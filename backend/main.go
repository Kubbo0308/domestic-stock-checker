package main

import (
	"domestic-stock-checker/config"
	"domestic-stock-checker/di"
)

func main() {
	r := config.NewConfig(di.NewStockDI())
	r.Run()
}
