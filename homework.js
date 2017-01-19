"use strict";

// Этот код можно менять как угодно
var items = {
    "milk": {price: 5.5, type: "Groceries"},
    "eggs": {price: 3.0, type: "Groceries"},
    "coca-cola": {price: 0.4, type: "Groceries"},
    "amoxicillin": {price: 6.7, type: "Groceries"},
    "aspirin": {price: 0.2, type: "PrescriptionDrug"},
    "marijuana": {price: 1.4, type: "PrescriptionDrug"},
    "hamburger": {price: 2, type: "PreparedFood"},
    "ceasar salad": {price: 4.2, type: "PreparedFood"},
};
const Items = require('./items');

var states = {
    "Alabama":{"Groceries": 0, "PrescriptionDrug": "", "base":0.04},
    "Alaska":{"Groceries": 0, "PrescriptionDrug": "", "base":0},
    "Arizona":{"Groceries": 0, "PrescriptionDrug": "", "base":0.056},
    "Arkansas":{"Groceries": 0.015, "PrescriptionDrug": "", "base":0.065},
    "California":{"Groceries": 0, "PrescriptionDrug": "", "base":0.075},
    "Colorado":{"Groceries": 0, "PrescriptionDrug": "", "base":0.029},
    "Connecticut":{"Groceries": 0, "PrescriptionDrug": "", "base":0.0635}
};

class States {
    constructor(states){
        this._states = states
    }

    get statesNames(){
        var arr = [];
        for(var key in this._states) {
            arr.push(key);
        }
        return arr;
    }
    getState(state){
        return this._states[state];
    }

    get randomState(){
        return this.statesNames[Math.floor(Math.random() * this.statesNames.length)];
    }
    getBase(state){
        return this._states[state].base;
    }
}

var itemTypes =
    {
        "Groceries": {
            "Alabama": 0,
            "Alaska": 0,
            "Arizona": "",
            "Arkansas": 0.015,
            "California": "",
            "Colorado": "",
            "Connecticut": ""
        },
        "PrescriptionDrug": {
            "Alabama": "",
            "Alaska": 0,
            "Arizona": "",
            "Arkansas": "",
            "California": "",
            "Colorado": "",
            "Connecticut": ""
        }
    };

function calc(state, itemType) {

    var itemTypeTaxModifier = itemTypes[itemType];
    if (itemTypeTaxModifier[state] === "") {
        return 0;
    }
    return new States(states).getState(state).base + itemTypeTaxModifier[state];
}

//const TaxCalculator = require('./taxcalculator');


class TaxCalculator {
    constructor(){
        this._states = states;
    }
    // У этой функции нелья менять интерфейс
    // Но можно менять содержимое
    calculateTax() {
        var states = new States(this._states);
        var ordersCount = this.ordersCount;
        var state = states.randomState;
        console.log(`----------${state}-----------`);
        for (var i = 0; i < ordersCount; i++) {
            var item = new Items(items).randomItem;
            this.calculatePriceFor(state, item);
        }
        console.log(`----Have a nice day!-----`);
    }
    calculatePriceFor(state, item){
        var result = null;
        if (new Items(items).getItemType(item) === "PreparedFood") {
            result = ( 1 + new States(states).getState(state).base ) * items[item].price;
        }
        else {
            result = calc(state, items[item].type) * items[item].price + items[item].price;
        }
        console.log(`${item}: $${result.toFixed(2)}`);
        return result;
    }

    get ordersCount(){
        return Math.floor(Math.random() * 3) + 1;
    }
}

//############################
//Production - код:
calculateTaxes();

//############################
//Тесты:

var tests = [
    () => assertEquals(3.0 * (1 + 0.04),  new TaxCalculator(states).calculatePriceFor("Alabama", "eggs")),
    () => assertEquals(0.4 * (1 + 0.015 + 0.065),  new TaxCalculator(states).calculatePriceFor("Arkansas", "coca-cola")),
    () => assertEquals(6.7 * (1 + 0.0),  new TaxCalculator(states).calculatePriceFor("Alaska", "amoxicillin")),
    () => assertEquals(6.7 * (1 + 0.0),  new TaxCalculator(states).calculatePriceFor("California", "amoxicillin")),
    () => assertEquals(2 * (1 + 0.0635),  new TaxCalculator(states).calculatePriceFor("Connecticut", "hamburger")),
];

//Раскомментируйте следующую строчку для запуска тестов:
runAllTests (tests);

//############################
//Код ниже этой строчки не надо менять для выполнения домашней работы

function calculateTaxes() {
    new TaxCalculator(states).calculateTax();
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