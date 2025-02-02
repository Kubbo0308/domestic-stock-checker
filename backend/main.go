package main

import (
	"fmt"
	"log"
	"strings"

	"github.com/gocolly/colly/v2"
)

func main() {
	c := colly.NewCollector()

	c.OnHTML("title", func(e *colly.HTMLElement) {
		fmt.Println(e.Text)
	})

	// 「table」タグ内の HTML を処理
	c.OnHTML("table", func(e *colly.HTMLElement) {
		// ここでは、テーブルの中に「収益」という文字列が含まれているテーブルを対象としています
		if !strings.Contains(e.Text, "収益") {
			return
		}

		fmt.Println("Found table containing '収益':")

		// テーブル内の各行（tr）を処理
		e.ForEach("tr", func(_ int, row *colly.HTMLElement) {
			var cells []string
			// ヘッダーセル（th）を取得
			row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
				cells = append(cells, cell.Text)
			})
			// 通常セル（td）を取得
			row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
				cells = append(cells, cell.Text)
			})
			// 行ごとにセル内容を表示
			fmt.Println(cells)
		})
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// エラーハンドラ
	c.OnError(func(r *colly.Response, err error) {
		log.Println("Request URL:", r.Request.URL, "failed with response:", r, "\nError:", err)
	})

	c.Visit("https://irbank.net/E04425/results")
}
