package infrastructure

import (
	"domestic-stock-checker/domain/repository"
	"fmt"
	"log"
	"strings"

	"github.com/gocolly/colly/v2"
)

type stockPersistence struct{}

func NewStockPersistence() repository.StockRepository {
	return &stockPersistence{}
}

func (sp *stockPersistence) FetchStockInfo(secuririesCode string) (string, []string, []string, []string, []string, error) {
	c := colly.NewCollector()

	var companyName string
	c.OnHTML("title", func(e *colly.HTMLElement) {
		companyName = e.Text
	})

	// 会社業績
	var companyPerformances []string
	// 財務状況
	var financialStatus []string
	// キャッシュフロー
	var cashFlow []string
	// 配当推移
	var dividendTrend []string
	c.OnHTML("table", func(e *colly.HTMLElement) {
		if strings.Contains(e.Text, "収益") {
			// テーブル内の各行（tr）を処理
			e.ForEach("tr", func(_ int, row *colly.HTMLElement) {
				// ヘッダーセル（th）を取得
				row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
					companyPerformances = append(companyPerformances, cell.Text)
				})
				// 通常セル（td）を取得
				row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
					companyPerformances = append(companyPerformances, cell.Text)
				})
			})
		} else if strings.Contains(e.Text, "総資産") {
			e.ForEach("tr", func(_ int, row *colly.HTMLElement) {
				// ヘッダーセル（th）を取得
				row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
					financialStatus = append(financialStatus, cell.Text)
				})
				// 通常セル（td）を取得
				row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
					financialStatus = append(financialStatus, cell.Text)
				})
			})
		} else if strings.Contains(e.Text, "営業CF") {
			e.ForEach("tr", func(_ int, row *colly.HTMLElement) {
				// ヘッダーセル（th）を取得
				row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
					cashFlow = append(cashFlow, cell.Text)
				})
				// 通常セル（td）を取得
				row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
					cashFlow = append(cashFlow, cell.Text)
				})
			})
		} else if strings.Contains(e.Text, "一株配当") {
			e.ForEach("tr", func(_ int, row *colly.HTMLElement) {
				// ヘッダーセル（th）を取得
				row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
					dividendTrend = append(dividendTrend, cell.Text)
				})
				// 通常セル（td）を取得
				row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
					dividendTrend = append(dividendTrend, cell.Text)
				})
			})
		}
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// エラーハンドラ
	c.OnError(func(r *colly.Response, err error) {
		log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	err := c.Visit("https://irbank.net/E04425/results")
	if err != nil {
		return "", nil, nil, nil, nil, err
	}
	return companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, nil
}
