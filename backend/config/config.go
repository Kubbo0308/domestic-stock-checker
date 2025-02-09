package config

import (
	"domestic-stock-checker/interface/handler"

	"github.com/gin-gonic/gin"
)

func NewConfig(sh handler.StockHandler) *gin.Engine {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.GET("/stock", sh.GetStockInfo)

	return r
}
