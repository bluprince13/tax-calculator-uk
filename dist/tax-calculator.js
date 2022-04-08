!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("TaxCalculator",[],t):"object"==typeof exports?exports.TaxCalculator=t():e.TaxCalculator=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),a=r(2);t.default=function(e,t){var r=a.TAX_SETTINGS,o={};o.grossIncome=e,o.options=t;var u=function(){var e=c();return e<=1e5?r.allowance.basic:e>1e5&&e<=125e3?12500-(e-1e5)/2:e>=125001?0:void 0},d=e/100*t.pensionPercentage,c=function(){return e-d},i=function(){var e,t=c()-(e=s()+y(),(0,n.getAmountRounded)(e));return(0,n.getAmountRounded)(t)},l=function(){var e=i();return(0,n.getAmountRounded)(e/52)},f=function(){var e=i();return(0,n.getAmountRounded)(e/365)},_=function(){var e=c()-u(),t=r.incomeTax,n=p(t.rate_0,e),a=p(t.rate_20,n.carry),o=p(t.rate_40,a.carry);return{rate_0:n,rate_20:a,rate_40:o,rate_45:p(t.rate_45,o.carry)}},s=function(){var e=_(),t=e.rate_0.tax+e.rate_20.tax+e.rate_40.tax+e.rate_45.tax;return(0,n.getAmountRounded)(t)},p=function(e,t){var r=-1===e.end?t:(0,n.getAmountRounded)(e.end-e.start),a=t-r,o=a>0?a:0;return t>0?t>=r?{tax:(0,n.getAmountRounded)(r*e.rate),carry:o}:{tax:(0,n.getAmountRounded)(t*e.rate),carry:o}:{tax:0,carry:o}},x=function(){var e=Math.max(c()-9500,0),t=e-40524;if(t>0){return{rate_0:{tax:0},rate_12:{tax:4862.88},rate_2:{tax:t/100*2}}}return{rate_0:{tax:0},rate_12:{tax:e/100*12},rate_2:{tax:0}}},y=function(){var e=x(),t=e.rate_0.tax+e.rate_12.tax+e.rate_2.tax;return(0,n.getAmountRounded)(t)};return o.getTaxBreakdown=function(){return{netIncome:{yearly:i(),monthly:(e=i(),(0,n.getAmountRounded)(e/12)),weekly:l(),daily:f()},personalAllowance:u(),paye:_(),nationalInsurance:x()};var e},o}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getAmountRounded=void 0;t.getAmountRounded=function(e){return Math.round(100*e)/100}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TAX_SETTINGS=void 0;t.TAX_SETTINGS={year:"2019/20",allowance:{basic:12571,age_65_74:12571,age_75_over:12571,blind:2520,thresholds:{age:27700,taper:1e5}},incomeTax:{rate_0:{start:0,end:0,rate:0},rate_20:{start:0,end:37699,rate:.2},rate_40:{start:37699,end:15e4,rate:.4},rate_45:{start:15e4,end:-1,rate:.45}},nationalInsurance:{pensionAge:68,rate_0:{start:0,end:184,rate:0},rate_12:{start:184,end:967,rate:.12},rate_2:{start:967,end:-1,rate:.02}},studentLoan:{plan_1:{threshold:19895,rate:.09},plan_2:{threshold:27295,rate:.09}}}}])}));