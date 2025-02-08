package main

import (
	"domestic-stock-checker/di"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/stock", di.NewStockDI().GetStockInfo)
	r.Run()
}
