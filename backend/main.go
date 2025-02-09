package main

import (
	"domestic-stock-checker/config"
	"domestic-stock-checker/di"
	"log"
)

func main() {
	r := config.NewConfig(di.NewStockDI())
	err := r.Run()
	if err != nil {
		log.Fatal("error", err)
	}
}
