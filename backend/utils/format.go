package utils

import "reflect"

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
