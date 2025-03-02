package repository

type CalculateRepository interface {
	CalculateMonetaryScore(data [][]string) float64
	CalculatePercentageScore(data [][]string) float64
	CalculateCapitalAdequacyScore(data [][]string) float64
	CalculateDividendPayoutScore(data [][]string) float64
}
