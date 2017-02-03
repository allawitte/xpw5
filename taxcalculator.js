'use strict';
const Items = require('./items');
const statesObj = require('./states');
const States = require('./statesClass');
const items = require('./itemsObj');
const Printer = require('./printer');
class TaxCalculator {
    constructor(state, items) {
        this._state = state;
        this._items = items;
    }

    // У этой функции нелья менять интерфейс
    // Но можно менять содержимое
    calculateTax() {

        var items = this._items;
        var state = this._state;
        var itemsToPay = [];

        console.log(`----------${state}-----------`);
        items.forEach(item => {
            itemsToPay.push({
                'item': item,
                'toPay': this.calculatePriceFor(state, item)
            });

        });

        console.log(`----Have a nice day!-----`);
        let printer = new Printer(state, itemsToPay);
        printer.printInvoice();
    }

    calcWithBaseTax(state, item) {
        return ( 1 + new States(statesObj).getBase(state) ) * new Items(items).getItemPrice(item);
    }

    calcWithAdditionalTax(state, item) {
        return (new States(statesObj).calcNoBasicTax(state, new Items(items).getItemType(item)) + 1) * new Items(items).getItemPrice(item);
    }


    calculatePriceFor(state, item) {
        var result = {
            "PreparedFood": this.calcWithBaseTax(state, item),
            "Groceries": this.calcWithAdditionalTax(state, item),
            "PrescriptionDrug": this.calcWithAdditionalTax(state, item)
        }[new Items(items).getItemType(item)];
        console.log(`${item}: $${result.toFixed(2)}`);
        return result;
    }

    get ordersCount() {
        return Math.floor(Math.random() * 3) + 1;
    }
}
module.exports = TaxCalculator;
/**
 * Created by HP on 1/19/2017.
 */
