import Calculator from "../src/Calculator"
import { TAX_SETTINGS } from "../src/TaxYears/21-22/Settings"

describe("Calculator", () => {
  it("returns correct tax breadkown when income is more than personal allowance", () => {
    // Verified at https://www.thesalarycalculator.co.uk/salary.php#modal-close
    const income = 200000
    const expected = {
      netIncome: {
        yearly: 117177.4,
        monthly: 9764.78,
        weekly: 2253.41,
        daily: 321.03
      },
      personalAllowance: 0,
      paye: {
        rate_0: { tax: 0, carry: 200000 },
        rate_20: { tax: 7539.8, carry: 162301 },
        rate_40: { tax: 44920.4, carry: 50000 },
        rate_45: { tax: 22500, carry: 0 }
      },
      nationalInsurance: {
        rate_0: { tax: 0 },
        rate_12: { tax: 4862.88 },
        rate_2: { tax: 2999.52 }
      },
      pension: 0,
      effectiveTaxRate: 41.41
    }

    const taxBreakdown = Calculator(income, {
      pensionPercentage: 0
    }).getTaxBreakdown()

    expect(taxBreakdown).toEqual(expected)
  })

  it("return 0 paye tax when income is equal to personal allowance", () => {
    const income = TAX_SETTINGS.allowance.basic
    const expectedPaye = {
      rate_0: { tax: 0, carry: 0 },
      rate_20: { tax: 0, carry: 0 },
      rate_40: { tax: 0, carry: 0 },
      rate_45: { tax: 0, carry: 0 }
    }

    const paye = Calculator(income, {
      pensionPercentage: 0
    }).getTaxBreakdown().paye

    expect(paye).toEqual(expectedPaye)
  })

  it("returns full pension and zero income when pensionPercentage is 100", () => {
    const income = 150000

    const taxBreakdown = Calculator(income, {
      pensionPercentage: 100
    }).getTaxBreakdown()

    const netIncome = taxBreakdown.netIncome.yearly
    const pension = taxBreakdown.pension
    expect(netIncome).toBe(0)
    expect(pension).toBe(income)
  })

  it("calculates tax on gross income after salary sacrifice", () => {
    const netIncomeWithPension = Calculator(100000, {
      pensionPercentage: 10
    }).getTaxBreakdown().netIncome.yearly

    const netIncomeWithoutPension = Calculator(90000, {
      pensionPercentage: 0
    }).getTaxBreakdown().netIncome.yearly

    expect(netIncomeWithPension).toBe(netIncomeWithoutPension)
  })
})
