package utils

import "strings"

func Contains(word string, targetWords []string) bool {
	for _, targetWord := range targetWords {
		if strings.Contains(word, targetWord) {
			return true
		}
	}

	return false
}
