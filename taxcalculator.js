'use strict';
const Items = require('./items');
const statesObj = require('./states');
const States = require('./statesClass');
const items = require('./itemsObj');
class TaxCalculator {
   
    // У этой функции нелья менять интерфейс
    // Но можно менять содержимое
    calculateTax() {
        var states = new States(statesObj);
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
            result = ( 1 + new States(statesObj).getBase(state) ) * new Items(items).getItemPrice(item);
        }
        else {
            result = new States(statesObj).calcNoBasicTax(state, new Items(items).getItemType(item)) * new Items(items).getItemPrice(item) + new Items(items).getItemPrice(item);
        }
        console.log(`${item}: $${result.toFixed(2)}`);
        return result;
    }

    get ordersCount(){
        return Math.floor(Math.random() * 3) + 1;
    }
}
module.exports = TaxCalculator;
/**
 * Created by HP on 1/19/2017.
 */
