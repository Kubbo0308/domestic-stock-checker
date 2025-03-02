package utils

import (
	"reflect"
	"strconv"
	"strings"
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

// "0.85兆", "2003億", "1234万" などの文字列を兆単位の float64 に変換する
func ParseMonetaryValue(s string) (float64, error) {
	s = strings.TrimSpace(s)
	multiplier := 1.0
	switch {
	case strings.HasSuffix(s, "兆"):
		// 1兆 = 10000億
		multiplier = 10000.0
		s = strings.TrimSuffix(s, "兆")
	case strings.HasSuffix(s, "億"):
		// 1億を基準にするので multiplier = 1
		multiplier = 1.0
		s = strings.TrimSuffix(s, "億")
	case strings.HasSuffix(s, "万"):
		// 1万 = 0.0001億
		multiplier = 0.0001
		s = strings.TrimSuffix(s, "万")
	}
	value, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return 0, err
	}
	return value * multiplier, nil
}

// "47.31" や "22.7%" のようなパーセント表記を数値に変換する
func ParsePercentageValue(s string) (float64, error) {
	s = strings.TrimSpace(s)
	s = strings.TrimSuffix(s, "%")
	return strconv.ParseFloat(s, 64)
}
