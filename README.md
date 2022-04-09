# 💷 Tax Calculator UK (2021/22) 💷

This package give you an income tax breakdown based on a yearly salary.

Forked from https://github.com/eagleeyejack/tax-calculator-uk. I have removed
corrections to account for age, blindness etc. to keep the calculations more
simple.

## Installation

You can install the package via npm or yarn.

```bash
npm install tax-calculator-uk
```

```bash
yarn add tax-calculator-uk
```

## Setup

You will need to import the package into your project and create an options object with the following options.

````javascript
import TaxCalculator from "tax-calculator-uk"

const options = {
  pensionPercentage: 5
}
### pensionPercentage - Number

This option represents the percentage of their yearly salary the person is paying into a pension.

## getTaxBreakdown

Returns a full breakdown of net income and tax deductions

```javascript
import TaxCalculator from "tax-calculator-uk"

const incomeTax = incomeTax.getTaxBreakdown()

console.log(incomeTax)
````

Returns

```json
{
  "netIncome": {
    "yearly": 117177.4,
    "monthly": 9764.78,
    "weekly": 2253.41,
    "daily": 321.03
  },
  "personalAllowance": 0,
  "paye": {
    "rate_0": { "tax": 0, "carry": 200000 },
    "rate_20": { "tax": 7539.8, "carry": 162301 },
    "rate_40": { "tax": 44920.4, "carry": 50000 },
    "rate_45": { "tax": 22500, "carry": 0 }
  },
  "nationalInsurance": {
    "rate_0": { "tax": 0 },
    "rate_12": { "tax": 4862.88 },
    "rate_2": { "tax": 2999.52 }
  },
  "pension": 0,
  "effectiveTaxRate": 41.41
}
```

󠁧󠁢󠁮
🚧 The figures are only meant to be used as a rough estimation, happy to accept forks to improve accuracy of figures. 🚧
