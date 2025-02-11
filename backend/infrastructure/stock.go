package infrastructure

import (
	"domestic-stock-checker/domain/repository"
	"domestic-stock-checker/utils"
	"fmt"
	"log"
	"time"

	"github.com/gocolly/colly/v2"
)

var (
	performanceWords   = [4]string{"収益", "ROA", "EPS", "純利益"}
	financeWords       = [3]string{"総資産", "自己資本比率", "有利子負債"}
	cashFlowWords      = [4]string{"営業CF", "投資CF", "財務CF", "現金等"}
	dividendTrendWords = [3]string{"一株配当", "配当性向", "剰余金の配当"}
)

type stockPersistence struct{}

func NewStockPersistence() repository.StockRepository {
	return &stockPersistence{}
}

func (sp *stockPersistence) FetchStockInfo(secuririesCode string) (string, [][]string, [][]string, [][]string, [][]string, error) {
	c := colly.NewCollector()

	// レートリミットの設定: 全ドメインに対して、リクエスト間に Delay と RandomDelay を挟む
	err := c.Limit(&colly.LimitRule{
		DomainGlob:  "*", // すべてのドメインに適用
		Delay:       2 * time.Second,
		RandomDelay: 1 * time.Second, // 最大2秒のランダムな追加遅延
	})
	if err != nil {
		return "", nil, nil, nil, nil, err
	}

	// リクエスト時の処理
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// エラーハンドラ
	c.OnError(func(r *colly.Response, err error) {
		log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	var companyName string
	c.OnHTML("title", func(e *colly.HTMLElement) {
		companyName = e.Text
	})

	// 決算まとめページにアクセス
	c.OnHTML("a[title='決算まとめ']", func(e *colly.HTMLElement) {
		link := e.Attr("href")
		fmt.Println("Found link with title:", link)
		err = e.Request.Visit(link)
	})
	if err != nil {
		return "", nil, nil, nil, nil, err
	}

	// 会社業績
	var companyPerformances [][]string
	// 財務状況
	var financialStatus [][]string
	// キャッシュフロー
	var cashFlow [][]string
	// 配当推移
	var dividendTrend [][]string
	c.OnHTML("table", func(e *colly.HTMLElement) {
		if utils.Contains(e.Text, performanceWords[:]) {
			companyPerformances = utils.GetInfoFromTable(e)
		} else if utils.Contains(e.Text, financeWords[:]) {
			financialStatus = utils.GetInfoFromTable(e)
		} else if utils.Contains(e.Text, cashFlowWords[:]) {
			cashFlow = utils.GetInfoFromTable(e)
		} else if utils.Contains(e.Text, dividendTrendWords[:]) {
			dividendTrend = utils.GetInfoFromTable(e)
		}
	})

	companyURL := fmt.Sprintf("https://irbank.net/%s", secuririesCode)
	err = c.Visit(companyURL)
	if err != nil {
		return "", nil, nil, nil, nil, err
	}
	return companyName, companyPerformances, financialStatus, cashFlow, dividendTrend, nil
}
