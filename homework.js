"use strict";
const States = require('./statesClass');
const states = require('./states');

// Этот код можно менять как угодно


const TaxCalculator = require('./taxcalculator');

var newState = new States(states);
newState.addNewState("Tennessee", 0.05, 0.07, 0.07, 0.07);
newState.addNewState("Texas", "", 0.0625, 0.0625, 0.0625);

//############################
//Production - код:
calculateTaxes();

//############################
//Тесты:

var tests = [
    () => assertEquals(3.0 * (1 + 0.04), new TaxCalculator().calculatePriceFor("Alabama", "eggs")),
    () => assertEquals(0.4 * (1 + 0.015 + 0.065), new TaxCalculator().calculatePriceFor("Arkansas", "coca-cola")),
    () => assertEquals(6.7 * (1 + 0.0), new TaxCalculator().calculatePriceFor("Alaska", "amoxicillin")),
    () => assertEquals(6.7 * (1 + 0.0), new TaxCalculator().calculatePriceFor("California", "amoxicillin")),
    () => assertEquals(2 * (1 + 0.0635), new TaxCalculator().calculatePriceFor("Connecticut", "hamburger")),
    () => assertEquals(2 * (1 + 0.07 + 0.07), new TaxCalculator().calculatePriceFor("Tennessee", "hamburger")),
    () => assertEquals(0.4 * (1 + 0.07 + 0.05), new TaxCalculator().calculatePriceFor("Tennessee", "coca-cola")),
];

//Раскомментируйте следующую строчку для запуска тестов:
runAllTests(tests);

//############################
//Код ниже этой строчки не надо менять для выполнения домашней работы

function calculateTaxes() {
    new TaxCalculator().calculateTax();
}

//############################
// Кустарный способ писать тесты

function assertEquals(expected, actual) {
    var epsilon = 0.000001;
    var difference = Math.abs(expected - actual);
    if (difference > epsilon || difference === undefined || isNaN(difference)) {
        console.error(`Fail! Expected: ${expected}, Actual: ${actual}`);
        return -1;
    }
    return 0;
}

function runAllTests(tests) {
    var failedTests = tests
        .map((f) => f())
        .map((code) => {
            if (code === -1) {
                return 1
            } else {
                return 0
            }
        })
        .reduce((a, b) => a + b, 0);

    if (failedTests === 0) {
        console.log(`Success: ${tests.length} tests passed.`);
    }
    else {
        console.error(`Fail: ${failedTests} tests failed.`);
    }
}