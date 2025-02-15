package utils

import (
	"reflect"
)

func CheckLastRowAndHeader(data [][]string) [][]string {
	if len(data) < 1 {
		return nil
	}

	header := data[0]
	lastRow := data[len(data)-1]
	if reflect.DeepEqual(header, lastRow) {
		data = data[:len(data)-1]
	}

	return data
}

func ExtractColumn(data [][]string, targets []string) [][]string {
	var targetIndex int
	// 複数の候補がヘッダーに含まれているか確認
	for _, target := range targets {
		for index, column := range data[0] {
			if target == column {
				targetIndex = index
				break
			}
		}
	}
	if targetIndex == 0 {
		return nil
	}

	var extractedData [][]string
	for _, value := range data {
		extractedRowData := []string{value[0], value[targetIndex]}
		extractedData = append(extractedData, extractedRowData)
	}
	return extractedData
}
