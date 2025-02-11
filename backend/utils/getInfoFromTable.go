package utils

import "github.com/gocolly/colly/v2"

func GetInfoFromTable(table *colly.HTMLElement) [][]string {
	var tableData [][]string
	table.ForEach("tr", func(_ int, row *colly.HTMLElement) {
		var rowData []string
		// ヘッダーセル（th）を取得
		row.ForEach("th", func(_ int, cell *colly.HTMLElement) {
			rowData = append(rowData, cell.Text)
		})
		// 通常セル（td）を取得
		row.ForEach("td", func(_ int, cell *colly.HTMLElement) {
			rowData = append(rowData, cell.Text)
		})

		if len(rowData) > 0 {
			tableData = append(tableData, rowData)
		}
	})
	return tableData
}
