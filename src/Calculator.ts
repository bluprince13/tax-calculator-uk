import {
	TaxSettings,
	CalculatorOptions,
	TaxRate,
	IncomeTax,
	IncomeTaxBreakdown,
	TaxBreakdownItem,
	NationalInsuranceBreakdown
} from "./Interfaces"

import { getAmountRounded } from "./utils/rounded"
import { TAX_SETTINGS } from "./TaxYears/21-22/Settings"

const Calculator = (grossIncome: number, options: CalculatorOptions) => {
	const taxSettings: TaxSettings = TAX_SETTINGS
	let calculator = {} as any

	calculator.grossIncome = grossIncome
	calculator.options = options

	/**
	 * Returns personal allowance
	 */
	const getAllowance = (): number => {
		return taxSettings.allowance.basic
	}

	/**
	 * Returns the allowed personal allowance
	 */
	const getPersonalAllowance = (): number => {
		const grossIncomeAfterSalarySacrifice = getGrossIncomeAfterSalarySacrifice()
		if (grossIncomeAfterSalarySacrifice <= 100000) {
			return getAllowance()
		} else if (grossIncomeAfterSalarySacrifice > 100000 && grossIncomeAfterSalarySacrifice <= 125000) {
			return 12500 - (grossIncomeAfterSalarySacrifice - 100000) / 2
		} else if (grossIncomeAfterSalarySacrifice >= 125001) {
			return 0
		}
	}

	/**
	 * Returns total tax deductions rounded to 2 decimal places
	 */
	const getTotalTaxDeductions = (): number => {
		let totalTaxDeductions: number = getTotalIncomeTax() + getTotalYearlyNationalInsurance()
		return getAmountRounded(totalTaxDeductions)
	}

	/**
	 * Pension amount
	 */
	const pensionAmount: number = (grossIncome / 100) * options.pensionPercentage

	/**
	 * Gross income after salary sacrifice
	 */
	const getGrossIncomeAfterSalarySacrifice = (): number => {
		return grossIncome - pensionAmount
	}

	/**
	 * Returns the total taxable income
	 */
	const getTotalTaxableIncome = (): number => {
		return getGrossIncomeAfterSalarySacrifice() - getPersonalAllowance()
	}

	/**
	 * Returns total net pay per year rounded to 2 decimal places
	 */
	const getTotalNetPayPerYear = (): number => {
		let totalNetPay: number = getGrossIncomeAfterSalarySacrifice() - getTotalTaxDeductions()
		return getAmountRounded(totalNetPay)
	}

	/**
	 * Returns total net pay per month rounded to 2 decimal places
	 */
	const getTotalNetPayPerMonth = (): number => {
		let totalNetPayPerYear: number = getTotalNetPayPerYear()
		return getAmountRounded(totalNetPayPerYear / 12)
	}

	/**
	 * Returns total net pay per week rounded to 2 decimal places
	 */
	const getTotalNetPayPerWeek = (): number => {
		let totalNetPayPerYear: number = getTotalNetPayPerYear()
		return getAmountRounded(totalNetPayPerYear / 52)
	}

	/**
	 * Returns total net pay per day rounded to 2 decimal places
	 */
	const getTotalNetPayPerDay = (): number => {
		let totalNetPayPerYear: number = getTotalNetPayPerYear()
		return getAmountRounded(totalNetPayPerYear / 365)
	}

	/**
	 * Returns a break down of all income tax bands
	 */
	const getIncomeTaxBreakdown = (): IncomeTaxBreakdown => {
		let totalTaxableIncome: number = getTotalTaxableIncome()
		let incomeTaxRates: IncomeTax = taxSettings.incomeTax
		let rate_0: TaxBreakdownItem = getTotalTaxForRateWithIncome(incomeTaxRates.rate_0, totalTaxableIncome)
		let rate_20: TaxBreakdownItem = getTotalTaxForRateWithIncome(incomeTaxRates.rate_20, rate_0.carry)
		let rate_40: TaxBreakdownItem = getTotalTaxForRateWithIncome(incomeTaxRates.rate_40, rate_20.carry)
		let rate_45: TaxBreakdownItem = getTotalTaxForRateWithIncome(incomeTaxRates.rate_45, rate_40.carry)
		return {
			rate_0,
			rate_20,
			rate_40,
			rate_45
		}
	}

	/**
	 * Returns total income tax rounded to 2 decimal places
	 */
	const getTotalIncomeTax = (): number => {
		let incomeTaxBreakdown: IncomeTaxBreakdown = getIncomeTaxBreakdown()
		let totalIncomeTax: number =
			incomeTaxBreakdown.rate_0.tax +
			incomeTaxBreakdown.rate_20.tax +
			incomeTaxBreakdown.rate_40.tax +
			incomeTaxBreakdown.rate_45.tax
		return getAmountRounded(totalIncomeTax)
	}

	/**
	 * Returns the total tax for tax band
	 *
	 * @param taxRate tax rate from settings
	 * @param totalIncome total income before reaching tax band (can be carry left over from last band)
	 */
	const getTotalTaxForRateWithIncome = (taxRate: TaxRate, totalIncome: number): TaxBreakdownItem => {
		let incomeTaxRateDifference: number =
			taxRate.end === -1 ? totalIncome : getAmountRounded(taxRate.end - taxRate.start)
		let totalMinusDifference: number = totalIncome - incomeTaxRateDifference
		let carry: number = totalMinusDifference > 0 ? totalMinusDifference : 0
		if (totalIncome > 0) {
			if (totalIncome >= incomeTaxRateDifference) {
				return {
					tax: getAmountRounded(incomeTaxRateDifference * taxRate.rate),
					carry
				}
			}
			return {
				tax: getAmountRounded(totalIncome * taxRate.rate),
				carry
			}
		}
		return {
			tax: 0,
			carry: carry
		}
	}

	/**
	 * Returns a breakdown for all national insurance using new method for budget 2020/2021
	 */
	const getNewNationalInsuranceBreakdown = () => {
		const taxableAmount = Math.max(getGrossIncomeAfterSalarySacrifice() - 9500, 0)
		const middle = 40524

		const higherAmount = taxableAmount - middle

		let rate_0: any
		let rate_12: any
		let rate_2: any

		if (higherAmount > 0) {
			const lower = (middle / 100) * 12

			const higher = (higherAmount / 100) * 2

			rate_0 = {
				tax: 0
			}
			rate_12 = {
				tax: lower
			}
			rate_2 = {
				tax: higher
			}

			return {
				rate_0,
				rate_12,
				rate_2
			}
		} else {
			rate_0 = {
				tax: 0
			}
			rate_12 = {
				tax: (taxableAmount / 100) * 12
			}
			rate_2 = {
				tax: 0
			}

			return {
				rate_0,
				rate_12,
				rate_2
			}
		}
	}

	/**
	 * Returns total yearly national insurance
	 */
	const getTotalYearlyNationalInsurance = (): number => {
		let nationalInsuranceBreakdown: NationalInsuranceBreakdown = getNewNationalInsuranceBreakdown()
		let totalYearlyNationalInsurance: number =
			nationalInsuranceBreakdown.rate_0.tax +
			nationalInsuranceBreakdown.rate_12.tax +
			nationalInsuranceBreakdown.rate_2.tax
		return getAmountRounded(totalYearlyNationalInsurance)
	}

	calculator.getTaxBreakdown = () => {
		return {
			netIncome: {
				yearly: getTotalNetPayPerYear(),
				monthly: getTotalNetPayPerMonth(),
				weekly: getTotalNetPayPerWeek(),
				daily: getTotalNetPayPerDay()
			},
			personalAllowance: getPersonalAllowance(),
			paye: getIncomeTaxBreakdown(),
			nationalInsurance: getNewNationalInsuranceBreakdown()
		}
	}

	return calculator
}

export default Calculator
