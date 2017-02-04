'use strict';

class Printer {
    constructor(state, items){
        this._state = state;
        this._items = items;
    }

    printInvoice(){
        var text = `----------${this._state}-----------\n`;
        this._items.forEach(item => {
            text +=`${item['item']}: $${item['toPay'].toFixed(2)}\n`;
        });
        text += `----Have a nice day!-----`;
        return text;
    }
}

module.exports = Printer;

/**
 * Created by HP on 2/2/2017.
 */
