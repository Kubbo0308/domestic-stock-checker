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

func Average(nums []float64) float64 {
	if len(nums) == 0 {
		return 0
	}
	sum := 0.0
	for _, n := range nums {
		sum += n
	}
	return sum / float64(len(nums))
}
