package utils

import "github.com/gocolly/colly/v2"

func GetInfoFromTable(table *colly.HTMLElement) []string {
	var infos []string
	table.ForEach("tr", func(_ int, row *colly.HTMLElement) {
		// ヘッダーセル（th）を取得
		row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
			infos = append(infos, cell.Text)
		})
		// 通常セル（td）を取得
		row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
			infos = append(infos, cell.Text)
		})
	})
	return infos
}
