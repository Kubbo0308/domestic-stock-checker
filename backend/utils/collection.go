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

func FindIndex[T comparable](slice []T, target T) int {
	for index, value := range slice {
		if value == target {
			return index
		}
	}

	return -1
}
