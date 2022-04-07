import Calculator from "../src/Calculator"
import { StudentLoanPlans } from "../src/interfaces"

describe("Calculator", () => {
	it("returns zero income when pensionPercentage is 100", () => {
		const options = ({
			age: 26,
			blind: false,
			pensionPercentage: 100,
			studentLoanPlan: StudentLoanPlans.NO_PLAN
		  })
		const netIncome = Calculator(150000, options).getTaxBreakdown().netIncome.yearly
		console.log(Calculator(60000, options).getTaxBreakdown())
		expect(netIncome).toBe(0)
	})
})
