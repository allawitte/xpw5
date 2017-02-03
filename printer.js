'use strict';

class Printer {
    constructor(state, items){
        this._state = state;
        this._items = items;
    }

    printInvoice(){
        console.log(`----------${this._state}-----------`);
        this._items.forEach(item => {
            console.log(`${item['item']}: $${item['toPay'].toFixed(2)}`);
        });
        console.log(`----Have a nice day!-----`);
    }
}

module.exports = Printer;

/**
 * Created by HP on 2/2/2017.
 */
