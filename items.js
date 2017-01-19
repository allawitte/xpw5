'use strict';
class Items {
    constructor(items){
        this._items = items;
    }
    get itemsNames(){
        var arr = [];
        for(var key in this._items){
            arr.push(key);
        }
        return arr;
    }
    get randomItem(){
        return this.itemsNames[Math.floor(Math.random() * this.itemsNames.length)];
    }
}

module.exports = Items;
/**
 * Created by HP on 1/19/2017.
 */
