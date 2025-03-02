package repository

type CalculateRepository interface {
	CalculateConsistency(data [][]string) float64
}
